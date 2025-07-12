import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Item {
  id: string
  title: string
  description: string
  category: string
  type: string
  size: string
  condition: string
  tags: string[]
  images: string[]
  userId: string
  userName: string
  userAvatar?: string
  pointsValue: number
  status: "available" | "pending" | "swapped"
  createdAt: string
}

interface ItemsState {
  items: Item[]
  featuredItems: Item[]
  userItems: Item[]
  loading: boolean
}

const initialState: ItemsState = {
  items: [],
  featuredItems: [],
  userItems: [],
  loading: false,
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload
    },
    setFeaturedItems: (state, action: PayloadAction<Item[]>) => {
      state.featuredItems = action.payload
    },
    setUserItems: (state, action: PayloadAction<Item[]>) => {
      state.userItems = action.payload
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.unshift(action.payload)
      state.userItems.unshift(action.payload)
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setItems, setFeaturedItems, setUserItems, addItem, updateItem, setLoading } = itemsSlice.actions
export default itemsSlice.reducer
