import classes from "./Articles.module.css";
import ArticleItem from "./ArticleItem";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticlesData } from "../../store/articles-actions";
import { authActions } from "../../store/auth";
import { uiActions } from "../../store/ui-slice";

const Articles = () => {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [LoadMorePage, setLoadMorePage] = useState(1);
  const accessToken = useSelector((state) => state.auth.AccessToken);
  const articlesData = useSelector((state) => state.auth.Articles);
  const SearchArticles = useSelector((state) => state.auth.SearchArticles);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    if (Articles.length === 0) {
      let response = await getArticlesData(
        "http://34.245.213.76:3000/articles?page=1",
        accessToken
      );
      console.log(response.message.response.docs);
      dispatch(authActions.Articles(response.message.response.docs));
    }
    setLoading(false);
  };

  const LoadMoreArticles = () => {
    setLoadMorePage(LoadMorePage + 1);
  };

  useEffect(() => {
    if (LoadMorePage > 1) {
      setLoading(true);
      async function fetchData() {
        const resp = await getArticlesData(
          `http://34.245.213.76:3000/articles?page=${LoadMorePage}`,
          accessToken
        );
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "success!",
            message: " loaded more data!",
          })
        );
        setLoading(false);

        if (resp.error === true) {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: " an error occured!",
            })
          );
        } else {
          let arr = resp.message.response.docs;
          if (LoadMorePage === 2 && searchInput.length > 0) {
            setLoadMorePage(1);
          } else {
            if (arr.length === 0) {
              console.log(LoadMorePage);
              console.log("empty array");
              dispatch(
                uiActions.showNotification({
                  status: "no more",
                  title: "no more!",
                  message: " no more data!",
                })
              );
            } else {
              dispatch(authActions.moreArticles(arr));
            }
          }
        }
      }
      fetchData();
      
    }
  }, [LoadMorePage]);

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
    dispatch(authActions.search(event.target.value));
  };

  const searchDataHandler = () => {
    dispatch(authActions.search(searchInput));
    console.log(searchInput);
    setSearchInput("");
  };
  return (
    <Fragment>
      <div className={classes.search}>
        <label htmlFor="search">Search</label>
        <input
          value={searchInput}
          onChange={searchInputChangeHandler}
          type="search"
          id="search"
        />
        <button onClick={searchDataHandler}>Search</button>
      </div>

      <section className={classes.dashboard}>
        <h2>Articles React Application</h2>

      { !loading && <ul>
          {articlesData.map((article) => (
            <ArticleItem
              key={article.id}
              id={article.id}
              title={article.abstract}
              description={article.lead_paragraph}
              image={
                article.multimedia[0] === undefined
                  ? article.multimedia[0]
                  : "https://static01.nyt.com/".concat(
                      article.multimedia[0].url
                    )
              }
            />
          ))}
        </ul>}
        {loading&& <p className={classes.loading}>loading...</p>}
      </section>

      <div className={classes.add}>
        <button onClick={LoadMoreArticles}>LoadMore</button>
      </div>
    </Fragment>
  );
};

export default Articles;
