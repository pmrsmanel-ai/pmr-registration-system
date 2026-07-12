import { useEffect, useState } from "react";

import {
  X,
  Save,
} from "lucide-react";

import {
  getSettings,
  updateSetting,
} from "../../services/settingsApi";

function SettingsModal({

  onClose,

}) {

  const [loading,setLoading]=
    useState(true);

  const [settings,setSettings]=
    useState([]);

  async function loadData(){

    try{

      setLoading(true);

      const data=
        await getSettings();

      setSettings(data);

    }

    finally{

      setLoading(false);

    }

  }

  useEffect(()=>{

    loadData();

  },[]);

  function change(index,value){

    const copy=[...settings];

    copy[index].setting_value=value;

    setSettings(copy);

  }

  async function save(){

    try{

      for(const item of settings){

        await updateSetting(

          item.setting_key,

          item.setting_value

        );

      }

      alert("Pengaturan berhasil disimpan.");

      onClose();

    }

    catch(err){

      alert(err.message);

    }

  }

  if(loading){

    return(

      <div className="fixed inset-0 flex items-center justify-center bg-black/50">

        <div className="rounded-3xl bg-white p-10">

          Memuat...

        </div>

      </div>

    );

  }

  return(

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-8">

          <h2 className="text-3xl font-black">

            Pengaturan Website

          </h2>

          <button onClick={onClose}>

            <X/>

          </button>

        </div>

        <div className="space-y-6 p-8">

                  {

            settings.map((item,index)=>(

              <div

                key={item.id}

                className="rounded-2xl border p-5"

              >

                <label className="mb-2 block font-semibold">

                  {item.description}

                </label>

                {

                  item.setting_key==="registration_open"

                  ?(

                    <select

                      value={item.setting_value}

                      onChange={(e)=>

                        change(

                          index,

                          e.target.value

                        )

                      }

                      className="w-full rounded-2xl border p-4"

                    >

                      <option value="true">

                        Buka

                      </option>

                      <option value="false">

                        Tutup

                      </option>

                    </select>

                  )

                  :(

                    <input

                      value={

                        item.setting_value || ""

                      }

                      onChange={(e)=>

                        change(

                          index,

                          e.target.value

                        )

                      }

                      className="w-full rounded-2xl border p-4"

                    />

                  )

                }

              </div>

            ))

          }

        </div>

        <div className="flex justify-end gap-4 border-t p-8">

          <button

            onClick={onClose}

            className="rounded-2xl border px-8 py-4 font-semibold hover:bg-gray-100"

          >

            Batal

          </button>

          <button

            onClick={save}

            className="flex items-center gap-2 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white hover:bg-red-800"

          >

            <Save size={20}/>

            Simpan

          </button>

        </div>
              </div>

    </div>

  );

}

export default SettingsModal;