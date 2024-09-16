import React from "react";
import ForgeReconciler, { Text, useProductContext } from "@forge/react";
import { requestConfluence } from "@forge/bridge";

const fetchCommentsForPage = async (pageId) => {
  const res = await requestConfluence(
    `/wiki/api/v2/pages/${pageId}/footer-comments`,
  );
  const data = await res.json();
  return data.results;
};

const App = () => {
  const context = useProductContext();

  // add these code to keep track of comments
  const [comments, setComments] = React.useState();
  console.log(`Number of comments on this page: ${comments?.length}`);

  React.useEffect(() => {
    if (context) {
      // extract page ID from the context
      const pageId = context.extension.content.id;
      console.log(context);

      fetchCommentsForPage(pageId).then(setComments);
    }
  }, [context]);

  return (
    <>
      <Text>Hello world!</Text>
      <Text>{JSON.stringify(context)}</Text>
      <Text>
        {context
          ? context.extension.isEditing
            ? "Editing"
            : "Viewing"
          : "unknown"}
      </Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
