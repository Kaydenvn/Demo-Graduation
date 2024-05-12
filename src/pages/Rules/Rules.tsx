import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import doc from "src/assets/Chuyen de quan ly phong thuc hanh thi nghiem_ngay 7&9.5.24_removed_compressed.pdf";

export default function Rules() {
  const docs = [
    {
      uri: doc,
    },
  ];
  return <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />;
}
