import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.container}>
      <span className={css.loader}></span>
    </div>
  );
}
