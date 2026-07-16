import Dashboard from "./Dashboard";
import HomepageStats from "./HomepageStats";
import TimelineModal from "./TimelineModal";
import SettingsModal from "./SettingsModal";
import GraduationPage from "./GraduationPage";

function AdminContent({

  selectedMenu,

  stats,

  applicants,

  filteredApplicants,

  search,

  setSearch,

  selectedApplicant,

  setSelectedApplicant,

  loadData,

  setSelectedMenu,

}) {

  switch (selectedMenu) {

    case "homepage":

      return (

        <HomepageStats

          onClose={() =>

            setSelectedMenu("dashboard")

          }

        />

      );

    case "timeline":

      return (

        <TimelineModal

          onClose={() =>

            setSelectedMenu("dashboard")

          }

        />

      );

    case "settings":

      return (

        <SettingsModal

          onClose={() =>

            setSelectedMenu("dashboard")

          }

        />

      );

    case "graduation":

      return (

        <GraduationPage

          applicants={filteredApplicants}

          onRefresh={loadData}

        />

      );

    case "dashboard":

    case "applicants":

    case "export":

    default:

      return (

        <Dashboard

          stats={stats}

          applicants={applicants}

          filteredApplicants={filteredApplicants}

          search={search}

          setSearch={setSearch}

          selectedApplicant={selectedApplicant}

          setSelectedApplicant={setSelectedApplicant}

          loadData={loadData}

          selectedMenu={selectedMenu}

        />

      );

  }

}

export default AdminContent;