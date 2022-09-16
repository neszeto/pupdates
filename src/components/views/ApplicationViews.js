import { Outlet, Route, Routes } from "react-router-dom"
import { CreateProfile } from "../profiles/CreateProfile"
import { EditProfile } from "../profiles/EditProfile"
import { FindPupdate } from "../profiles/FindPupdate"
import { MyProfile } from "../profiles/MyProfile"
import { PendingPupdate } from "../profiles/PendingPupdates"
import { ViewFullProfile } from "../profiles/ViewFullProfile"



export const ApplicationViews = () => {
    
     
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Pupdates</h1>
                    <FindPupdate />
                    

                    <Outlet />
                </>
            }>	
                
            </Route>
            <Route path="pendingpupdate" element={<PendingPupdate />} />
            <Route path="editprofile/:foundDogId" element={<EditProfile />} />
            <Route path="findpupdate" element={<FindPupdate />} />
            <Route path="fullprofile/:dogId" element={<ViewFullProfile />} />
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="createprofile" element={<CreateProfile />} />
        </Routes>
    )
}

