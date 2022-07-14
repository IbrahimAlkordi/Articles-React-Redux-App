import classes from "./ArticleItem.module.css";

const ArticleItem = (props) => {
  const { title, description,id,image } = props;

  return (
    <li key={id} className={classes.item}>
      <header>
        <h3>{title}</h3>
        <img src={image}></img>

      </header>
      <p>{description}</p>
    </li>
  );
};

export default ArticleItem;
