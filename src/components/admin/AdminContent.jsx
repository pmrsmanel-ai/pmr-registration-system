import HomepageStats from "./HomepageStats";

function AdminContent({

  menu,

}) {

  switch(menu){

    case "homepage":

      return <HomepageStats />;

    default:

      return (

        <div className="rounded-3xl bg-white p-10 shadow">

          <h2 className="text-3xl font-black">

            Dashboard

          </h2>

          <p className="mt-3 text-gray-500">

            Pilih menu di Sidebar.

          </p>

        </div>

      );

  }

}

export default AdminContent;