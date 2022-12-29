import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/images/background2.jpg'
import { AuthContext } from '../../authProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';
const WriteDiary = () => {
      const { user } = useContext(AuthContext);
      useTitle("My Diary");
      const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
      const navigate = useNavigate();
      const imageHostKey = process.env.REACT_APP_imagebb_key;

      const handleSaveStory = (data) => {
        const date = format(new Date(), "PPPP");
        // current time in milisec
        const now = new Date();
        const timeMili = now.getTime();

        const image = data.img[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            console.log(imgData);
            if (imgData.success) {
              const myStory = {
                image: imgData.data.url,
                title: data.title,
                post_date: date,
                writer_name: user?.displayName,
                writer_email: user?.email,
                writer_story: data.description,
                post_time:timeMili
              };
              console.log(myStory);

              // save product info to the database.
              fetch("http://localhost:1000/addStory", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  authorization: `bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
                body: JSON.stringify(myStory),
              })
                .then((res) => res.json())
                .then((result) => {
                  console.log(result);
                  toast.success("Story added successfully.");
                  navigate("/myDiary");
                })
                .catch((err) => toast.error(err.message))
            }
          });
      };
    return (
      <div>
        <div className="relative">
          <div>
            <img className="h-screen w-full" src={bg} alt="" />
          </div>
          <div className="centered lg:w-1/2">
            <div className="lg:p-10">
              <h3 className="text-3xl text-white fontPoppins text-center">
                Write Diary
              </h3>
              <form onSubmit={handleSubmit(handleSaveStory)}>
                <div className="">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-white fontPoppins">
                        Heading
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered bg-opacity-70"
                      {...register("title", { required: "Name is required." })}
                    />
                    {errors.title && (
                      <p className="text-error text-sm">
                        <small>{errors.title?.message}</small>
                      </p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-white fontPoppins">
                        Photo
                      </span>
                    </label>
                    <input
                      type="file"
                      className="input input-bordered bg-opacity-70"
                      {...register("img", { required: "Image is required." })}
                    />
                    {errors.img && (
                      <p className="text-error text-sm">
                        <small>{errors.img?.message}</small>
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-white fontPoppins">
                      Today's Story
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-44 bg-opacity-70"
                    placeholder="Write here..."
                    {...register("description", {
                      required: "description is required.",
                    })}
                  ></textarea>
                  {errors.description && (
                    <p className="text-error text-sm">
                      <small>{errors.description?.message}</small>
                    </p>
                  )}
                </div>
                <div className="form-control mt-4">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Save"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default WriteDiary;