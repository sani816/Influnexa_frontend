import axios from "axios";

function CreatorTable({creators,loadData}) {

  const deleteCreator=async(id)=>{

    const confirmDelete=
      window.confirm("Delete Creator?");

    if(!confirmDelete) return;

    await axios.delete(
      `https://influnexa-backend-7.onrender.com/api/admin/creator/${id}`
    );

    loadData();
  };

  return (

    <div className="mt-10">

      <h2 className="text-3xl text-white mb-5">
        Influencers
      </h2>

      <table className="w-full bg-white rounded-xl">

        <thead>

          <tr className="bg-pink-500">

            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Followers</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {creators.map((creator)=>(

            <tr key={creator._id}>

              <td>

                <img
                  src={`https://influnexa-backend-7.onrender.com/uploads/${creator.image}`}
                  className="w-16 h-16 rounded-full"
                />

              </td>

              <td>{creator.fullName}</td>

              <td>{creator.email}</td>

              <td>{creator.followersRange}</td>

              <td>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={()=>
                    deleteCreator(creator._id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CreatorTable;