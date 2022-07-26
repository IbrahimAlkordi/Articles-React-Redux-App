import classes from "./Dashboard.module.css";
import ArticleItem from "./ArticleItem";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../store/api-actions";
import { uiActions } from "../../store/ui-slice";
import { articlesActions } from "../../store/articles-slice";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [LoadMorePage, setLoadMorePage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const accessToken = useSelector((state) => state.auth.AccessToken);
  const articlesData = useSelector((state) => state.art.Articles);
  const SearchArticles = useSelector((state) => state.art.SearchArticles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(articlesActions.Articles([]));
    const fetchData = async () => {
      setLoading(true);
      if (articlesData.length === 0) {
        let response = await get(
          "http://34.245.213.76:3000/articles?page=1",
          accessToken
        );
        console.log(response.message.response.docs);
        dispatch(articlesActions.Articles(response.message.response.docs));
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const LoadMoreArticles = () => {
    setLoadMorePage(LoadMorePage + 1);
  };

  useEffect(() => {
    if (LoadMorePage > 1) {
      setLoading(true);
      async function fetchData() {
        const resp = await get(
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
          if (LoadMorePage === 2) {
            setLoadMorePage(1);
          }
        } else {
          let arr = resp.message.response.docs;
          if (LoadMorePage === 2 && searchInput.length > 0) {
            setLoadMorePage(1);
          } else {
            if (arr.length === 0) {
              //console.log(LoadMorePage);
              // console.log("empty array");
              dispatch(
                uiActions.showNotification({
                  status: "no more",
                  title: "no more!",
                  message: " no more data!",
                })
              );
            } else {
              dispatch(articlesActions.moreArticles(arr));
            }
          }
        }
      }
      fetchData();
    }
  }, [LoadMorePage, accessToken]);

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
    dispatch(articlesActions.search(event.target.value));
    dispatch(
      uiActions.showNotification({
        status: "search",
        title: "success!",
        message: " search success!",
      })
    );
  };

  const clearSearchHandler = () => {
    setSearchInput("");
    dispatch(
      uiActions.showNotification({
        status: "clear",
        title: "cleared!",
        message: " search cleared!",
      })
    );
  };

  const searchContent = (
    <ul>
      {SearchArticles.map((article) => (
        <ArticleItem
          key={Math.random()}
          id={Math.random()}
          title={article.abstract}
          description={article.lead_paragraph}
          image={
            article.multimedia[0] === undefined
              ? article.multimedia[0]
              : "https://static01.nyt.com/".concat(article.multimedia[0].url)
          }
        />
      ))}
    </ul>
  );

  const articlesContent = (
    <div>
      <section className={classes.dashboard}>
        <h2>Articles React Application</h2>
        {!loading && (
          <ul>
            {articlesData.map((article) => (
              <ArticleItem
                key={Math.random()}
                id={Math.random()}
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
          </ul>
        )}
        {loading && <p className={classes.loading}>loading...</p>}
      </section>

      <div className={classes.add}>
        <button onClick={LoadMoreArticles}>LoadMore</button>
      </div>
    </div>
  );

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
        <button onClick={clearSearchHandler}>Clear</button>

        {searchInput && searchContent}
      </div>

      {!searchInput && articlesContent}
    </Fragment>
  );
};

export default Dashboard;
