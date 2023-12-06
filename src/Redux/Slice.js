import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  Message: '',
  isChatLoading: true,

  predefinedQuestion: [],
  upload: false,
  imageData: '',
  modalVisible: false,
  productNFound: false,
  textMessage: '',
  messageLoader: false,
  BuyURL: '',
  storyLoader: false,
  chatData: [],
  content: null,
  barcodeData: null,
  edit: false,
  historyProducts: [],
  product: null,
  storySeen: null,
  storySelected: null,
  profilePicture: null,
  title: '',
  current: 0,
  isModalVisible: null,
  noContent: false,
  ProductName: '',
  close: false,
  barcode: '',
  loading: false,
  textinput: false,
  historyVisible: false,
  showScanner: true,
  cModalVisible: false,
  mediaPictures: [],
  description: null,
  brandName: '',
  PIPVisible: false,
};

const Slice = createSlice({
  name: 'Barcode',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.Message = action.payload;
    },
    setisChatLoading(state, action) {
      state.isChatLoading = action.payload;
    },
    setpredefinedQuestion(state, action) {
      state.predefinedQuestion = action.payload;
    },
    setUpload(state, action) {
      state.upload = action.payload;
    },
    setImageData(state, action) {
      state.imageData = action.payload;
    },
    setmodalVisible(state, action) {
      state.modalVisible = action.payload;
    },
    setproductNFound(state, action) {
      state.productNFound = action.payload;
    },
    setTextMessage(state, action) {
      state.textMessage = action.payload;
    },
    setstoryLoader(state, action) {
      state.storyLoader = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setBarcode(state, action) {
      state.barcode = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    setHistoryProducts(state, action) {
      state.historyProducts = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setStorySeen(state, action) {
      state.storySeen = action.payload;
    },
    setStorySelected(state, action) {
      state.storySelected = action.payload;
    },
    setProfilePicture(state, action) {
      state.profilePicture = action.payload;
    },
    settitle(state, action) {
      state.title = action.payload;
    },
    setCurrent(state, action) {
      state.current = action.payload;
    },
    setisModalVisible(state, action) {
      state.isModalVisible = action.payload;
    },
    setNoContent(state, action) {
      state.noContent = action.payload;
    },
    setProductName(state, action) {
      state.ProductName = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    settextinput(state, action) {
      state.textinput = action.payload;
    },
    setHistoryVisible(state, action) {
      state.historyVisible = action.payload;
    },
    SetshowScanner(state, action) {
      state.showScanner = action.payload;
    },
    setcModalVisible(state, action) {
      state.cModalVisible = action.payload;
    },
    setMediaPictures(state, action) {
      state.mediaPictures = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },

    setbrandName(state, action) {
      state.brandName = action.payload;
    },
    setPIPVisible(state, action) {
      state.PIPVisible = action.payload;
    },
    setchatData(state, action) {
      state.chatData = action.payload;
    },
    setBuyURL(state, action) {
      state.BuyURL = action.payload;
    },
    setMessageLoader(state, action) {
      state.messageLoader = action.payload;
    },
    setClosed(state, action) {
      state.close = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  setMessage,
  setisChatLoading,
  setUpload,
  setImageData,
  setmodalVisible,
  setTextMessage,
  setMessageLoader,
  setstoryLoader,
  setchatData,
  setPIPVisible,
  resetState,
  setcModalVisible,
  SetshowScanner,
  settextinput,
  setLoading,
  setClosed,
  setUserInfo,
  setEdit,
  setHistoryProducts,
  setStorySelected,
  setCurrent,
  setisModalVisible,
} = Slice.actions;

export default Slice.reducer;
