import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProfileQuery ,useUpdateProfileMutation } from '../features/profileApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


const updateProfile = () => {
//  const [skills,setSkills] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const {
    data: userData,
    refetch
  } = useProfileQuery(userInfo._id);

  const [profileData, setProfileData] = useState({
    name: userData?.name || null,
    role: userData?.profile.role || null,
    about: userData?.profile.about || null,
    phone: userData?.profile.phone || null,
    location: userData?.profile.location || null,
    skills: userData?.profile.skills || null
  });

  const [ updateProfile ] = useUpdateProfileMutation();

  const handleInputchange = (e) => {
    setInputValue(e.target.value);
  }
  
  const handleSkillAdd = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedValue = inputValue.trim();

      if (trimmedValue && !profileData.skills.includes(trimmedValue)) {
        setProfileData({
          ...profileData,
          skills:[...profileData.skills,trimmedValue]
        });
        setInputValue('');
      } 
    }
  }

  const handleSkillRemove = (removeSkill) => { 
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill != removeSkill)
    });
  }
  
  const handleInputValueChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const userData = {
      id: userInfo._id,
      profile: profileData
    }
    const res = await updateProfile(userData).unwrap();
    if (res) {
      toast.success("Profile Updated Successfully");
      refetch();
      navigate('/user-profile');
    }
   }

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form onSubmit={handleSubmit}>
            
            <h2 className="text-3xl text-center font-semibold mb-6">Update Profile</h2>

            <h3 className="text-2xl mb-5">User Info</h3>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                id='name'
                name="name"
                value={profileData.name}
                onChange={handleInputValueChange}
                className="border rounded w-full py-2 px-3"
                placeholder='Your Name'
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor='role' className="block text-gray-700 font-bold mb-2">
                Role
              </label>
              <input
                type="text"
                id='role'
                name="role"
                value={profileData.role}
                onChange={handleInputValueChange}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Web Developer"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="about"
                className="block text-gray-700 font-bold mb-2"
                >About</label
              >
              <textarea
                id='about'
                name="about"
                value={profileData.about}
                onChange={handleInputValueChange}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2"
              >Phone
              </label>
              <input
                id='phone'
                name="phone"
                value={profileData.phone}
                onChange={handleInputValueChange}
                className="border rounded w-full py-2 px-3"
                required
                placeholder='Your Phone No'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='location' className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                value={profileData.location}
                onChange={handleInputValueChange}
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Your Location'
                required         
              />
            </div>
            
            <div className='mb-4'>
              <label htmlFor='skills' className='block text-gray-700 font-bold mb-2'>
                Skills
              </label>

              <div className='flex flex-wrap gap-1'>
                {profileData.skills.map((skill,index) => (
                  <div
                    key={index}
                    className='bg-indigo-500 text-white rounded-full px-4 py-1 mb-2 cursor-pointer hover:bg-red-500'
                    onClick={() => handleSkillRemove(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>

              <input
                type='text'
                id='skills'
                name='skills'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Add Your Skills'
                value={inputValue}
                onChange={handleInputchange}
                onKeyDown={handleSkillAdd}
              />
            </div>
            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default updateProfile