import { Outlet, Route, Routes } from "react-router-dom"
import { LocalDogParks } from "../LocalDogParks"
import { CreateProfile } from "../profiles/CreateProfile"
import { EditProfile } from "../profiles/EditProfile"
import { FindPupdate } from "../profiles/FindPupdate"
import { MyProfile } from "../profiles/MyProfile"

import { ViewFullProfile } from "../profiles/ViewFullProfile"

import { PendingPupdate } from "../profiles/PendingPupdate"



export const ApplicationViews = () => {
    
     
    return (
        <Routes>
            <Route path="/" element={
                <>
                    
                    <FindPupdate />
                  

                    <Outlet />
                </>
            }>	
                
            </Route>
            <Route path="pendingpupdate" element={<PendingPupdate />} />
            <Route path="editprofile/:foundDogId" element={<EditProfile />} />
            <Route path="/" element={<FindPupdate />} />
            <Route path="fullprofile/:dogId" element={<ViewFullProfile />} />
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="createprofile" element={<CreateProfile />} />
            <Route path="localParks" element={<LocalDogParks />} />
        </Routes>
    )
}

