import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bg from "../../assets/images/background3.jpg";
import { fetchStories } from "../../Redux/features/storySlice";
import loading from "../../assets/images/circle-loading-lines.gif";
import { PhotoProvider, PhotoView } from "react-photo-view";
import dot from '../../assets/images/loading-dot.gif'
import { toast } from "react-hot-toast";
const MyDiary = () => {
  const { isLoading, stories, error } = useSelector((state) => state.storiesR);
  const dispatch = useDispatch();
//   console.log(stories);
  useEffect(() => {
    dispatch(fetchStories());
  }, []);
    
    const handleDelete=(id) => {
        fetch(`http://localhost:1000/stories?id=${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then(res => res.json()).then(data => {
                if (data.deletedCount > 0) {
                    dispatch(fetchStories());
                    toast.success('Story Deleted..')
                } else {
                   toast.error("Failed to Delete.."); 
            }
        })
    }
  return (
    <div>
      <div className="relative">
        <div className="fixed w-full">
          <img className="h-screen w-full" src={bg} alt="" />
        </div>
        <div className="mid mt-20 w-full">
          <div className="mx-2">
            {isLoading && (
              <div className="flex justify-center items-center">
                <img src={loading} alt="" />
              </div>
            )}

            {error && <h4>{error}</h4>}
            {stories.length === 0 ? (
              <div>
                <p className="text-3xl font-extrabold text-center mt-5 fontPoppins">
                  No Story Found..
                </p>
              </div>
            ) : (
              <div>
                {stories.map((story) => (
                  <div className=" lg:mx-40 bg-base-100 bg-opacity-20 lg:p-10 py-5 lg:pb-5 lg:py-0 mb-3">
                    <p className="text-3xl font-Passions text-center mb-3">
                      {story.post_date}
                    </p>
                    <div className=" flex lg:flex-row flex-col ">
                      <div>
                        <PhotoProvider>
                          <PhotoView src={story.image}>
                            <img
                              src={story.image}
                              className="lg:max-w-sm rounded-lg shadow-2xl hover:cursor-pointer"
                              alt=""
                            />
                          </PhotoView>
                        </PhotoProvider>
                      </div>
                      <div className="lg:ml-10 mt-3 lg:mt-0 w-full">
                        <div className="flex justify-between items-center">
                          <h3 className="text-3xl font-extrabold fontBebas tracking-wide ">
                            {story.title}
                          </h3>
                          <div>
                            <div className="dropdown dropdown-end">
                              <label tabIndex={0} className="hover:cursor-pointer">
                                <img className="w-10" src={dot} alt="" />
                              </label>
                              <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-base-100 bg-opacity-10 rounded-box w-24"
                              >
                                <li>
                                  <a>Edit</a>
                                </li>
                                <li>
                                  <button onClick={()=>handleDelete(story._id)}>Delete</button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p>{story.writer_story}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDiary;
