import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';

const ITEM_TYPE = 'FLOW_ELEMENT';

// Draggable item in sidebar
const SidebarItem = ({ type, label }) => {
  const [, drag] = useDrag(
    () => ({
      type: ITEM_TYPE,
      item: { type, label },
    }),
    [type, label]
  );

  return (
    <div
      ref={drag}
      className='p-2 mb-2 bg-white rounded border cursor-move text-sm'
    >
      {label}
    </div>
  );
};

// Node box
const Node = ({ node, onSelect, isSelected }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      className={`relative p-3 bg-white rounded shadow-md w-44 text-xs cursor-pointer ${
        isSelected ? 'ring-2 ring-indigo-500' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
    >
      <div className='flex justify-between items-start'>
        <div className='font-semibold'>{node.label}</div>
        <div className='relative'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
            className='text-gray-500 hover:text-gray-800'
          >
            ⋮
          </button>
          {menuOpen && (
            <div
              className='absolute right-0 top-full mt-1 bg-white border rounded shadow-sm text-xs z-10'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>
                Edit
              </div>
              <div className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>
                Change
              </div>
            </div>
          )}
        </div>
      </div>
      {node.subtitle && (
        <div className='text-gray-500 mt-1 text-[10px]'>{node.subtitle}</div>
      )}
    </div>
  );
};

// Connector between nodes
const Connector = () => {
  return (
    <div className='flex justify-center'>
      <svg
        width='20'
        height='40'
        className='my-1'
        style={{ overflow: 'visible' }}
        aria-hidden='true'
      >
        <path d='M10 0 L10 40' stroke='#cbd5e1' strokeWidth='2' fill='none' />
        <circle
          cx='10'
          cy='20'
          r='4'
          fill='#f1f5f9'
          stroke='#cbd5e1'
          strokeWidth='1'
        />
      </svg>
    </div>
  );
};

// Placeholder that accepts drops
const AddStepPlaceholder = ({ addNode }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => {
      addNode({
        id: uuidv4(),
        type: item.type,
        label: item.label,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`flex items-center justify-center h-14 w-44 border-dashed border-2 rounded mb-4 text-sm transition ${
        isOver && canDrop
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-300 bg-transparent'
      }`}
    >
      + Add step
    </div>
  );
};

// Right-side detail panel
const DetailPanel = ({ node }) => {
  if (!node)
    return (
      <div className='w-72 bg-white border rounded p-4'>
        <div className='text-sm font-medium'>Select a step</div>
        <div className='text-gray-500 mt-2'>
          Click a node to edit its settings.
        </div>
      </div>
    );
  return (
    <div className='w-72 bg-white border rounded p-4 flex flex-col'>
      <div className='flex justify-between items-center mb-2'>
        <div className='font-semibold'>
          {node.type === 'trigger' ? 'Trigger:' : ''} {node.label}
        </div>
        <div className='text-xs text-blue-600 cursor-pointer'>Change</div>
      </div>
      <div className='text-sm mb-4'>When trigger condition start</div>
      <select className='border rounded p-2 mb-2'>
        <option>Select Condition</option>
      </select>
      <div className='mt-auto flex gap-2'>
        <button className='flex-1 border rounded px-3 py-1 text-sm'>
          Cancel
        </button>
        <button className='flex-1 bg-indigo-600 text-white rounded px-3 py-1 text-sm'>
          Save
        </button>
      </div>
    </div>
  );
};

// Main builder
const FlowBuilder = () => {
  const [nodes, setNodes] = useState([
    {
      id: uuidv4(),
      type: 'trigger',
      label: 'Trigger',
      subtitle: 'Form Submission',
    },
  ]);
  const [selected, setSelected] = useState(nodes[0].id);

  const addNode = useCallback(
    (node) => {
      setNodes((prev) => [...prev, node]);
      setSelected(node.id);
    },
    [setNodes]
  );

  const selectNode = useCallback((id) => {
    setSelected(id);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selected) || null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='flex gap-4 h-full'>
        {/* Sidebar */}
        <div className='w-60 bg-white border rounded p-4 flex-shrink-0'>
          <div className='font-bold mb-2'>Flow Elements</div>
          <div className='text-xs text-gray-500 mb-2'>Action</div>
          <SidebarItem type='send' label='Send Email' />
          <SidebarItem type='tags' label='Tags' />
          <div className='text-xs text-gray-500 my-2'>Delay</div>
          <SidebarItem type='time' label='Time Delay' />
          <SidebarItem type='wait' label='Wait Until' />
          <div className='text-xs text-gray-500 my-2'>Flow Condition</div>
          <SidebarItem type='branch' label='True/False Branch' />
          <SidebarItem type='multi' label='Multi Split' />
          <SidebarItem type='percent' label='Percentage Split' />
          <SidebarItem type='exit' label='Exit' />
        </div>

        {/* Canvas */}
        <div
          className='flex-1 relative bg-gray-50 border rounded p-6 overflow-auto'
          style={{ minHeight: '500px' }}
          onClick={() => selectNode(null)}
        >
          <div className='max-w-2xl mx-auto'>
            <div className='flex flex-col items-center relative'>
              {nodes.map((n, idx) => (
                <div
                  key={n.id}
                  className='flex flex-col items-center w-full relative'
                >
                  <div>
                    <Node
                      node={n}
                      onSelect={selectNode}
                      isSelected={selected === n.id}
                    />
                  </div>
                  {idx < nodes.length - 1 && <Connector />}
                </div>
              ))}

              {/* Add step placeholder */}
              <div className='w-full mb-4 flex justify-center'>
                <AddStepPlaceholder addNode={addNode} />
              </div>

              {/* Exit node */}
              <div className='mt-2'>
                <div className='p-3 bg-white rounded shadow-md w-44 text-xs text-center'>
                  Exit
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right detail panel */}
        <div className='w-72'>
          <DetailPanel node={selectedNode} />
        </div>
      </div>
    </DndProvider>
  );
};

export default FlowBuilder;
