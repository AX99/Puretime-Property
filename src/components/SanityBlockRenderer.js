import React from "react";

export default function SanityBlockRenderer({ blocks }) {
  if (!blocks || !blocks.length) return <p className="text-neutral-500">No description available</p>;

  const renderMarks = (text, marks = [], markDefs = []) => {
    let element = text;
    marks.forEach(mark => {
      if (mark === "strong") element = <span className="font-semibold">{element}</span>;
      else if (mark === "em") element = <em>{element}</em>;
      else if (mark === "underline") element = <span className="underline">{element}</span>;
      else if (mark === "strike-through") element = <span className="line-through">{element}</span>;
      else {
        // Handle link annotation
        const def = markDefs.find(def => def._key === mark && def._type === "link");
        if (def && def.href) {
          element = (
            <a href={def.href} className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">
              {element}
            </a>
          );
        }
      }
    });
    return element;
  };

  const output = [];
  let listType = null;
  let listItems = [];
  let pendingExtraMarginForNextList = false;
  let currentListExtraMargin = false;
  let pendingZeroMarginForNextList = false;
  let currentListZeroMargin = false;

  blocks.forEach((block, idx) => {
    if (block._type !== "block" || !block.children) return;

    const content = block.children.map((child, i) =>
      <React.Fragment key={child._key || i}>
        {renderMarks(child.text, child.marks, block.markDefs)}
      </React.Fragment>
    );

    // Determine if this block has any non-empty text content
    const isEmptyContent = block.children
      .map(child => (child.text || "").trim())
      .join("")
      .trim().length === 0;

    // Get full text content for heading detection
    const blockText = (block.children || [])
      .map(child => child.text || "")
      .join("")
      .trim();

    // Handle lists (bullet or number)
    if (block.listItem) {
      // If starting a new list type, flush previous
      if (!listType || listType !== block.listItem) {
        if (listType && listItems.length) {
          const marginClass = currentListZeroMargin
            ? "mt-0 mb-4"
            : (currentListExtraMargin ? "mt-6 mb-4" : "mt-3 mb-4");
          output.push(
            listType === "number"
              ? <ol key={`ol-${idx}`} className={`list-decimal ml-6 ${marginClass}`}><>{listItems}</></ol>
              : <ul key={`ul-${idx}`} className={`list-disc ml-6 ${marginClass}`}><>{listItems}</></ul>
          );
        }
        listType = block.listItem;
        listItems = [];
        currentListExtraMargin = pendingExtraMarginForNextList;
        pendingExtraMarginForNextList = false;
        currentListZeroMargin = pendingZeroMarginForNextList;
        pendingZeroMarginForNextList = false;
      }
      if (!isEmptyContent) {
        listItems.push(<li key={block._key}>{content}</li>);
      }
    } else {
      // If previously in a list, flush it
      if (listType && listItems.length) {
        const marginClass = currentListZeroMargin
          ? "mt-0 mb-4"
          : (currentListExtraMargin ? "mt-6 mb-4" : "mt-3 mb-4");
        output.push(
          listType === "number"
            ? <ol key={`ol-${idx}`} className={`list-decimal ml-6 ${marginClass}`}><>{listItems}</></ol>
            : <ul key={`ul-${idx}`} className={`list-disc ml-6 ${marginClass}`}><>{listItems}</></ul>
        );
        listType = null;
        listItems = [];
      }
      if (isEmptyContent) {
        return; // Skip rendering empty paragraphs/blocks
      }
      switch (block.style) {
        case "h1":
          output.push(<h1 key={block._key}>{content}</h1>);
          break;
        case "h2":
          output.push(<h2 key={block._key}>{content}</h2>);
          break;
        case "h3":
          output.push(<h3 key={block._key}>{content}</h3>);
          break;
        case "blockquote":
          output.push(<blockquote key={block._key}>{content}</blockquote>);
          break;
        default:
          // Nudge down the "Key Features:" heading visually and ensure bullets start immediately after
          if (blockText.toLowerCase() === "key features:") {
            output.push(<p key={block._key} className="mt-6">{content}</p>);
            pendingExtraMarginForNextList = false;
            pendingZeroMarginForNextList = true;
          } else {
            // Detect lead-in headings like "Interior & Features:" followed by normal text in same paragraph
            const firstChild = (block.children || [])[0];
            const isLeadInHeading = (
              firstChild &&
              Array.isArray(firstChild.marks) &&
              firstChild.marks.includes("strong") &&
              /:\\s*$/.test((firstChild.text || ""))
            ) || (
              firstChild &&
              Array.isArray(firstChild.marks) &&
              firstChild.marks.includes("strong") &&
              (block.children || []).length > 1
            );
            if (isLeadInHeading) {
              // Keep only the lead-in span bold via marks; paragraph itself not bold
              output.push(<p key={block._key} className="mt-6">{content}</p>);
            } else {
              output.push(<p key={block._key}>{content}</p>);
            }
          }
      }
    }
  });

  // If at end and still have list items, flush them
  if (listType && listItems.length) {
    const marginClass = currentListZeroMargin
      ? "mt-0 mb-4"
      : (currentListExtraMargin ? "mt-6 mb-4" : "mt-3 mb-4");
    output.push(
      listType === "number"
        ? <ol key="ol-end" className={`list-decimal ml-6 ${marginClass}`}><>{listItems}</></ol>
        : <ul key="ul-end" className={`list-disc ml-6 ${marginClass}`}><>{listItems}</></ul>
    );
  }

  // Add Tailwind prose for beautiful, consistent typography
  return <div className="prose prose-neutral max-w-none">{output}</div>;
}
