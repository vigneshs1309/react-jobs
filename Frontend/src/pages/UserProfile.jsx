import React from "react";
import { useSelector } from "react-redux";
import { findInitial } from "../components/Avatar";
import TimeLine from '../components/TimeLine';
import UserApplied from "../components/UserApplied";
import { FaUniversity, FaPlusCircle,} from 'react-icons/fa'
import { Card, Typography, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useProfileQuery } from '../features/profileApiSlice'
import AddExperience from "../components/AddExperience";
import AddEducation from "../components/AddEducation";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: userData,
    isSuccess,
  } = useProfileQuery(userInfo._id);

  return (
    <>
      {isSuccess ? (
        <section className="w-full absolute bg-indigo-50">
          <div className="container mx-auto transform-cpu">
            <Card className="my-6 mx-4 p-4 px-6 lg:p-10">
              <div className="grid grid-cols-30/70 w-full place-items-center">
                <div className=" bg-indigo-700 h-20 w-20 lg:h-25 lg:w-25 rounded-full font-semibold text-2xl relative">
                  <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white">{findInitial(userInfo)}</p>
                </div>
                <div className="text-black place-self-start">
                  <Typography
                    variant="h4"
                    className="uppercase text-indigo-700"
                  >
                    {userData.name}
                  </Typography>
                  <Typography
                    as={"p"}
                    className=""
                  >
                    {userData.profile.role}
                  </Typography>
                  <Typography
                    as={"p"}
                    className=""
                  >
                    {userData.profile.location}
                  </Typography>
                </div>
              </div>
            </Card>
            <Card className="my-6 mx-4 p-4 px-6">
              <ListItem>
                <ListItemPrefix className="text-indigo-700 font-semibold">
                  Email:
                </ListItemPrefix>
                <div className="text-black">
                  {userInfo.email}
                </div>
              </ListItem>
              <ListItem>
                <ListItemPrefix className="text-indigo-700 font-semibold">
                  Phone:
                </ListItemPrefix>
                <div className="text-black">
                  {userData.profile.phone}
                </div>
              </ListItem>
            </Card>
            <Card className="my-6 mx-4 p-4 px-6">
              <Typography as={"h1"} className="text-indigo-700 font-semibold">
                About Me
              </Typography>
              <Typography as={"p"} className="text-black">
                &nbsp;&nbsp; &nbsp; {userData.profile.about}
              </Typography>
            </Card>
            <Card className="my-6 mx-4 p-4 px-6">
              <Typography as={"h1"} className="text-indigo-700 font-semibold">
                Skills
              </Typography>
              <div className="inline-flex gap-4 mt-2 flex-wrap">
                {
                  userData.profile.skills.map((skill, index) => (
                    <p className="bg-indigo-600 py-2 px-4 rounded-xl text-white" key={index}>{skill}</p>
                  ))
                }
              </div>
            </Card>
            <Card className="my-6 mx-4 px-4 py-6">
              <div className="flex">
                <Typography as={"h1"} className="text-indigo-700 font-semibold mb-3 flex size-6">
                  Experience
                </Typography>
                <AddExperience />
              </div>
              <TimeLine experiences={userData.profile.experience} />
            </Card>
            <Card className="my-6 mx-4 px-4 py-5">
              <div className="flex">
                <Typography as={"h1"} className="text-indigo-700 font-semibold">
                  Education
                </Typography>
                <AddEducation />
              </div>
              {userData.profile.education.map((Education, index) => (
                <ListItem key={index}>
                  <ListItemPrefix>
                    <div className="bg-blue-gray-50 p-2">
                      <FaUniversity className="text-indigo-700 size-6" />
                    </div>
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" className="text-indigo-700">
                      {Education.institution}
                    </Typography>
                    <Typography variant="small">
                      {Education.duration}
                    </Typography>
                  </div>
                </ListItem>
              ))
              }
            </Card>
            <Card className="my-6 mx-4 px-4 py-5 contain-content">
              <Typography className="text-indigo-700 font-semibold mb-3">
                Jobs Applied
              </Typography>
              <UserApplied />
            </Card>
          </div>
        </section >
      ) : (
          <p>Error fetching data </p>
      ) }
      </>
  );
};

export default UserProfile;
