import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import doc from "src/assets/Noiquy.pdf";

export default function Rules() {
  const docs = [
    {
      uri: doc,
    },
  ];
  return (
    <DocViewer
      pluginRenderers={DocViewerRenderers}
      documents={docs}
      config={{ pdfVerticalScrollByDefault: true }}
    />
  );
}
