import { useState } from "react";

import HeroStatCard from "./HeroStatCard";
import HeroStatModal from "./HeroStatModal";

function HeroStats({

  stats = [],

}) {

  const [selectedItem, setSelectedItem] =
    useState(null);

  return (

    <section className="-mt-6 relative z-20">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (

          <HeroStatCard

            key={item.id}

            item={item}

            onClick={setSelectedItem}

          />

        ))}

      </div>

      <HeroStatModal

        item={selectedItem}

        onClose={() =>

          setSelectedItem(null)

        }

      />

    </section>

  );

}

export default HeroStats;