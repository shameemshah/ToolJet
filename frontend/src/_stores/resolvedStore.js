import { create, zustandDevTools } from './utils';
import { subscribeWithSelector } from 'zustand/middleware';

const STORE_NAME = 'Resolved Store';

const ACTIONS = {
  SET_RESOLVED_VALUE: 'SET_RESOLVED_VALUE',
};

const initialState = {
  //   '050596f1-f667-415c-bd57-189b2b133088': {
  //     linkedIds: {
  //       'fc849fb5-043f-457a-b3e7-e0477b167b97': true,
  //     },
  //   },
  //   'fc849fb5-043f-457a-b3e7-e0477b167b97': {
  //     linkedIds: {},
  //   },

  '2016cc2f-6d23-4abf-8d29-6a4d16f92e5b': {
    linkedIds: {
      '1002bf13-b91a-4ee3-8e4b-8e969b6b89b6': true,
    },
  },
  '1002bf13-b91a-4ee3-8e4b-8e969b6b89b6': {
    linkedIds: {},
  },
};

export const useResolvedStore = create(
  zustandDevTools(
    (set, get) => ({
      ...initialState,
      actions: {
        setResolvedState: (state) => {
          set({ ...state });
        },
        setResolvedValue: (id, type) => {
          set(
            {
              id: {
                type: type,
              },
            },
            false,
            { type: ACTIONS.SET_RESOLVED_VALUE }
          );
        },
      },
    }),
    { name: STORE_NAME }
  )
);

export const useStore = create(subscribeWithSelector(() => useResolvedStore.getState()));
