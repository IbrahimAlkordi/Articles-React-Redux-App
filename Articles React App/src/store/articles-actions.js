export const getArticlesData = async (url,token) => {
  try {
    const response = await fetch(url,{
      headers:{
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      }
    });
    const json = await response.json();
    return {
      error: false,
      message: json,
    };
  } catch (e) {
    return {
      error: true,
      message: e,
    };
  }
};
