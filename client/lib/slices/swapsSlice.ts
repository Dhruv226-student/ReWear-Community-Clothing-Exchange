import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Swap {
  id: string
  requesterId: string
  requesterName: string
  ownerId: string
  ownerName: string
  itemId: string
  itemTitle: string
  itemImage: string
  offeredItemId?: string
  offeredItemTitle?: string
  pointsOffered?: number
  status: "pending" | "accepted" | "rejected" | "completed"
  message?: string
  createdAt: string
}

interface SwapsState {
  userSwaps: Swap[]
  incomingRequests: Swap[]
  outgoingRequests: Swap[]
  loading: boolean
}

const initialState: SwapsState = {
  userSwaps: [],
  incomingRequests: [],
  outgoingRequests: [],
  loading: false,
}

const swapsSlice = createSlice({
  name: "swaps",
  initialState,
  reducers: {
    setUserSwaps: (state, action: PayloadAction<Swap[]>) => {
      state.userSwaps = action.payload
    },
    setIncomingRequests: (state, action: PayloadAction<Swap[]>) => {
      state.incomingRequests = action.payload
    },
    setOutgoingRequests: (state, action: PayloadAction<Swap[]>) => {
      state.outgoingRequests = action.payload
    },
    addSwap: (state, action: PayloadAction<Swap>) => {
      state.outgoingRequests.unshift(action.payload)
    },
    updateSwap: (state, action: PayloadAction<Swap>) => {
      const updateSwapInArray = (swaps: Swap[]) => {
        const index = swaps.findIndex((swap) => swap.id === action.payload.id)
        if (index !== -1) {
          swaps[index] = action.payload
        }
      }

      updateSwapInArray(state.userSwaps)
      updateSwapInArray(state.incomingRequests)
      updateSwapInArray(state.outgoingRequests)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setUserSwaps, setIncomingRequests, setOutgoingRequests, addSwap, updateSwap, setLoading } =
  swapsSlice.actions
export default swapsSlice.reducer
