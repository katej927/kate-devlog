// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp, getApp, getApps } from 'firebase/app'
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAnalytics } from 'firebase/analytics'
// eslint-disable-next-line import/no-extraneous-dependencies
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAEh4CVuS3Xuc9D_Av5L__X0Lz0OMROkL8',
  authDomain:
    '[dev-blog-b5961.firebaseapp.com](http://dev-blog-b5961.firebaseapp.com/)',
  projectId: 'dev-blog-b5961',
  storageBucket:
    '[dev-blog-b5961.appspot.com](http://dev-blog-b5961.appspot.com/)',
  messagingSenderId: '228541307901',
  appId: '1:228541307901:web:6313c35e00a4d183a6d794',
  measurementId: 'G-3CG73201YY',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const analytics = getAnalytics(app)

export const storage = getStorage()
export default app
