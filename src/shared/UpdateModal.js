import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchStories } from "../Redux/features/storySlice";

const UpdateModal = ({ closeModal, modalData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imagebb_key;
  const dispatch = useDispatch();
  const handleUpdateStory = (data) => {
    // console.log(data);
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
            writer_story: data.description,
          };
          console.log(myStory);

          // update story info to the database.
          fetch(
            `https://day-diary-server.vercel.app/updateStory/${modalData._id}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(myStory),
            }
          )
            .then((res) => res.json())
            .then((result) => {
              //   console.log(result);
              dispatch(fetchStories());
              closeModal();
              toast.success("Story updated successfully.");
            })
            .catch((err) => toast.error(err.message));
        }
      });
  };
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="UpdateModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="">
            <div className="">
              <h3 className="text-3xl fontPoppins text-center">Update Diary</h3>
              <form onSubmit={handleSubmit(handleUpdateStory)}>
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
                      defaultValue={modalData.title}
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
                    defaultValue={modalData.writer_story}
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
                    value="Update"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="modal-action">
            <button onClick={closeModal} className="btn btn-warning">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
