import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../features/contacts/contactSlice';
import campaignReducer from '../features/campaigns/campaignSlice';
import automationReducer from '../features/automation/automationSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    campaigns: campaignReducer,
    automation: automationReducer,
    analytics: analyticsReducer,
  },
});
