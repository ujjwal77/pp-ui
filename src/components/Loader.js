import ProgressBar from "./Progress";

export default function Loader() {
  return (
    <div className="Loader">

      <h2>Progress Bar:</h2>
      <ProgressBar
        isLoading={false}
        percent={70}
        size={"large"}
        showInfo={true}
      />
    </div>
  );
}
