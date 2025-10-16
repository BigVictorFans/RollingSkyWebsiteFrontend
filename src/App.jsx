import React from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import RollingSkyNavbar from './components/appbar'
import Homepage from './pages/homepage'
import PostsPage from './pages/posts/postspage'
import PostViewPage from './pages/posts/viewpost'
import AddPostPage from './pages/posts/addpost'
import EditPostPage from './pages/posts/editpost'
import EditCommentPage from './pages/posts/editpostcomment'
import LevelsMainPage from './pages/levels/levelspage'
import LevelDetailsPage from './pages/levels/viewlevel'
import AddLevel from './pages/levels/addlevels'
import EditLevel from './pages/levels/editlevels'
import Login from './pages/users/login'
import Signup from './pages/users/signup'
import ManageUsers from './pages/users/manageusers'
import ManageLevelsPage from './pages/levels/managelevels'
import GameReviewsPage from './gamereviews/gamereview'
import AddGameReviewPage from './gamereviews/addgamereview'
import LevelReviewsPage from './pages/levels/viewlevelreviews'
import AdminDashboard from './admin'
import CategoriesPage from './pages/posts/managepostcategories'
import UpdateLogPage from './pages/updatelogs/updatelogs'
import AddUpdateLog from './pages/updatelogs/addupdatelog'
import ChangeUserName from './pages/users/changename'
import EditUserPage from './pages/users/edituser'
import { useCookies } from 'react-cookie'
import UserDashboard from './userdashboard'
import ManagePosts from './pages/posts/manageposts'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from 'sonner'
import AdminRoute from './adminroute'
function App() {
  return (
      <CookiesProvider>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/posts' element={<PostsPage />} />
              <Route path='/posts/:id' element={<PostViewPage />} />
              <Route path='/posts/add' element={<AddPostPage />} />
              <Route path='/levels' element={<LevelsMainPage />} />
              <Route path='/levels/:id' element={<LevelDetailsPage />} />
              <Route path='/levels/add' element={<AdminRoute><AddLevel/></AdminRoute>} />
              <Route path='/levels/edit/:id' element={<AdminRoute><EditLevel/></AdminRoute>} />
              <Route path='/levels/:id/reviews' element={<LevelReviewsPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/admin/manageusers' element={<AdminRoute><ManageUsers /></AdminRoute>} />
              <Route path='/manageusers/edit/:id' element={<AdminRoute><EditUserPage /></AdminRoute>} />
              <Route path='/admin/managelevels' element={<AdminRoute><ManageLevelsPage /></AdminRoute>} />
              <Route path='/gamereviews' element={<GameReviewsPage />} />
              <Route path='/gamereviews/add' element={<AdminRoute><AddGameReviewPage /></AdminRoute>} />
              <Route path='/admin/managepostcategories' element={<AdminRoute><CategoriesPage /></AdminRoute>} />
              <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path='/updatelogs' element={<UpdateLogPage />} />
              <Route path='/updatelogs/add' element={<AdminRoute><AddUpdateLog /></AdminRoute>} />
              <Route path='/manageposts' element={<ManagePosts />} />
              <Route path='/userdashboard' element={<UserDashboard />} />
              <Route path='/changeusername' element={<ChangeUserName />} />
            </Routes>
          <Toaster/>
        </BrowserRouter>
      </CookiesProvider>
  )
}

export default App
