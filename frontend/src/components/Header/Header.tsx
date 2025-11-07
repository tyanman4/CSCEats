import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>CSCEats</h3>
    </div>
  );
};
