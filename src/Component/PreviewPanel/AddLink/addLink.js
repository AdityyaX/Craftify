import React from 'react'
import { useState, useContext } from 'react';
import { set, get } from "lodash";
import { pageDesignContext } from '../../../Context/contexts';

export default function AddLink(props) {
    let pageDesignState = useContext(pageDesignContext);
    const [addLinkState, setAddLinkState] = useState({
        currentMode: "url",
        urlLink: {
            targetURL: "",
            targetType: "_blank",
            rel: {
                opner: true,
                refer: true,
                follow: false,
                sponsored: false
            }
        },
        emailLink: {
            targetEmail: "",
            targetSubject: ""
        },
        phoneLink: {
            targetPhone: ""
        },
        scrollLink: {
            targetScroll: "top"
        }
    })
    // e.preventDefault();
    // let ws = window.getSelection();
    // if (ws.anchorNode === ws.focusNode && ws.type === "Range") {
    //     if (ws.toString()) {
    //         let a = document.createElement('a');
    //         a.href = 'http://www.google.com';
    //         a.title = 'GOOGLE';
    //         ws.getRangeAt(0).surroundContents(a);
    //     }
    // } else {
    //     /**
    //      * I really hate to use this here, but have no other option after spending a day against it.
    //      * Deprecated function: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
    //      */
    //     document.execCommand('createLink', false, prompt('URL', ''));
    // }

    const createLinkHTMLFromURI = ([__url, __type, _relStr]) => {
        let a = document.createElement('a');
        a.href = __url;
        a.target = __type;
        a.rel = _relStr.join(" ");
        return a;
    }

    const createLinkHTML = () => {
        let __url = addLinkState.urlLink.targetURL;
        let __type = addLinkState.urlLink.targetType;
        let __rel = addLinkState.urlLink.rel;
        let _relStr = [];

        if (__rel.follow) {
            _relStr.push("nofollow");
        }

        if (__rel.opner) {
            _relStr.push("noopner")
        }

        if (__rel.refer) {
            _relStr.push("noreffer")
        }

        if (__rel.sponsored) {
            _relStr.push("sponsored")
        }

        return [__url, __type, _relStr];
    }

    const createEmailHTML = () => {
        let __url = "mailto:";
        __url += addLinkState.emailLink.targetEmail;

        if (addLinkState.emailLink.targetSubject) {
            __url += "?subject=" + addLinkState.emailLink.targetSubject;
        }

        return [__url, "_self", []];
    }

    const createPhoneHTML = () => {
        let __url = "tel:";
        __url += addLinkState.phoneLink.targetPhone;

        return [__url, "_self", []];
    }

    const createScrollHTML = () => {
        let __url = "modify:";

        if (addLinkState.scrollLink.targetScroll === "top") {
            __url += "pageFunctionMoveToTop"
        } else {
            __url += "pageFunctionMoveToBottom"
        }
        // __url += addLinkState.phoneLink.targetPhone;

        return [__url, "_self", []];
    }

    const applyLinkToSelection = () => {
        let currentNode = props.currentlyActive.current;
        let __currentEl = getNodeData(currentNode, 0);
        let __parentEl = getNodeData(currentNode, -1);


        if (__currentEl.elemEditable) {
            let ws = window.getSelection();
            if (ws.toString().length < 1) {
                alert("Unable to add hyperlink: Empty selection");
                return;
            }
            if (ws.anchorNode === ws.focusNode && ws.type === "Range") {

                if (ws.toString()) {
                    let ws = window.getSelection();
                    let __a;
                    switch (addLinkState.currentMode) {
                        case "none":
                            //remove the link if exist

                            /**
                             * some function to remove the link
                             */
                            return;
                            break;
                        case "url":
                            __a = createLinkHTML();
                            break;
                        case "email":
                            __a = createEmailHTML();
                            break;
                        case "phone":
                            __a = createPhoneHTML();
                            break;
                        case "scroll":
                            __a = createScrollHTML();
                            break;
                    }

                    ws.getRangeAt(0).surroundContents(createLinkHTMLFromURI(__a));


                    //Todo [done]: also will need to update in the object

                    //set the current elem 
                    let __before_node = getNodeData(props.currentlyActive.current, 0);
                    let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
                    setNodeData(props.currentlyActive.current, 0, { ...__before_node, inHTML: encodeURIComponent(node.innerHTML) })


                    props.closePanel();
                    return;
                } else {
                    alert("Unable to create hyperlink: selection is empty string")
                    return;
                }



            } else {

                let __a;
                switch (addLinkState.currentMode) {
                    case "none":
                        //remove the link if exist

                        /**
                         * some function to remove the link
                         */
                        return;
                        break;
                    case "url":
                        __a = createLinkHTML();
                        break;
                    case "email":
                        __a = createEmailHTML();
                        break;
                    case "phone":
                        __a = createPhoneHTML();
                        break;
                    case "scroll":
                        __a = createScrollHTML();
                        break;
                }

                /**
                 * I really hate to use this here, but have no other option after spending a day around it.
                 * Deprecated function: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
                 */
                document.execCommand('createLink', false, __a[0]);

                /* update the datain object */
                //set the current elem 
                let __before_node = getNodeData(props.currentlyActive.current, 0);
                let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
                setNodeData(props.currentlyActive.current, 0, { ...__before_node, inHTML: encodeURIComponent(node.innerHTML) })

                props.closePanel();
                return;
            }
        } else {
            // let currentNode = props.currentlyActive.current;
            // let __currentEl = getNodeData(currentNode, 0);
            // let __parentEl = getNodeData(currentNode, -1);

            let __a;
            switch (addLinkState.currentMode) {
                case "none":
                    //remove the link if exist

                    /**
                     * some function to remove the link
                     */
                    return;
                    break;
                case "url":
                    __a = createLinkHTML();
                    break;
                case "email":
                    __a = createEmailHTML();
                    break;
                case "phone":
                    __a = createPhoneHTML();
                    break;
                case "scroll":
                    __a = createScrollHTML();
                    break;
            }


            let attribs = { href: __a[0] }

            if (__a[1].length > 0) {
                attribs = { ...attribs, target: __a[1] }
            }

            if (__a[2].length > 0) {
                attribs = { ...attribs, rel: __a[2].join(" ") }
            }

            if (__parentEl.elementType === "a") {
                //update the param elem only
                setNodeData(props.currentlyActive.current, -1, { ...__parentEl, attributes: attribs })


            } else {
                //insert the a node inside

                let __newLinkNode = {
                    ...__parentEl
                }

                //insertIndex
                let __hrefIndex = props.currentlyActive.current.split(",");
                __hrefIndex = __hrefIndex[__hrefIndex.length - 1];
                __newLinkNode.elements[__hrefIndex] = {
                    previmg: "/assets/images/elements/layouts/2col.png",
                    elid: "anchorLink",
                    inHTML: "",
                    desc: "AnchorLink",
                    attributes: attribs,
                    elementType: "AnchorLink",
                    classList: "",
                    styles: { color: "#000000" },
                    elemType: "a",
                    elemEditable: true,
                    enableDropping: false,
                    elements: [__parentEl.elements[__hrefIndex]]
                }

                //no need for inner html as state has to be 
                setNodeData(props.currentlyActive.current, -1, __newLinkNode)

            }
            props.closePanel();
            return;
        }

    }

    const setNodeData = (elString, level, data) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);
        let __temp_structure = { ...pageDesignState.design }

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        set(__temp_structure, _node_path, data);
        pageDesignState.setDesign(__temp_structure);
    }

    const getNodeData = (elString, level) => {
        let currentNode = elString.split(',')
        let currentNodeLast = currentNode[currentNode.length - 1];
        currentNode = (level === 0) ? currentNode : currentNode.slice(0, level);

        let _node_path;
        if (currentNode.length > 0) {
            _node_path = "elements[" + currentNode.join('].elements[') + "]"
        } else {
            _node_path = "elements[" + currentNodeLast + "]"
        }

        return get(pageDesignState.design, _node_path);
    }

    const selectAllText = () => {

        //node
        let currentNode = props.currentlyActive.current;
        let selectTextCls = getNodeData(currentNode, 0).elemEditable;

        if (selectTextCls) {
            requestAnimationFrame(() => {
                let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]");
                node.focus();
                if (document.selection) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(node);
                    range.select();
                } else if (window.getSelection) {
                    var range = document.createRange();
                    range.selectNodeContents(node);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                }
            });
        } else {
            requestAnimationFrame(() => {
                let node = document.querySelector("[data-path=\"" + props.currentlyActive.current + ",\"]")
                node.focus();
            });
        }
    }



    return (
      <div className="flex h-full">
        <div className="flex h-full">
          <ul className="list-none p-0 m-0 h-full border-r border-gray-200">
            <li
              className={`${
                addLinkState.currentMode === 'url' ? 'bg-white text-blue-600' : ''
              } border-b border-gray-200 px-2 py-1 min-w-[100px] hover:bg-white hover:text-blue-600 cursor-pointer`}
              onClick={() => {
                setAddLinkState({ ...addLinkState, currentMode: 'url' });
                selectAllText();
              }}
            >
              Web Address
            </li>
            <li
              className={`${
                addLinkState.currentMode === 'email' ? 'bg-white text-blue-600' : ''
              } border-b border-gray-200 px-2 py-1 min-w-[100px] hover:bg-white hover:text-blue-600 cursor-pointer`}
              onClick={() => {
                setAddLinkState({ ...addLinkState, currentMode: 'email' });
                selectAllText();
              }}
            >
              Email
            </li>
            <li
              className={`${
                addLinkState.currentMode === 'phone' ? 'bg-white text-blue-600' : ''
              } border-b border-gray-200 px-2 py-1 min-w-[100px] hover:bg-white hover:text-blue-600 cursor-pointer`}
              onClick={() => {
                setAddLinkState({ ...addLinkState, currentMode: 'phone' });
                selectAllText();
              }}
            >
              Phone number
            </li>
            <li
              className={`${
                addLinkState.currentMode === 'scroll' ? 'bg-white text-blue-600' : ''
              } border-b border-gray-200 px-2 py-1 min-w-[100px] hover:bg-white hover:text-blue-600 cursor-pointer`}
              onClick={() => {
                setAddLinkState({ ...addLinkState, currentMode: 'scroll' });
                selectAllText();
              }}
            >
              Top / Bottom of page
            </li>
          </ul>
        </div>
   <div className="flex-grow h-[calc(100%-7px)]">
    <div className="h-full">
      {/* No Link Panel */}
      {addLinkState.currentMode === 'none' && (
        <div className="flex items-center justify-center h-52 w-full text-center">
          <p className="max-w-[200px]">Choose from the left list which type of link you wish to apply.</p>
        </div>
      )}

      {/* Absolute URL Panel */}
      {addLinkState.currentMode === 'url' && (
        <div className="h-[calc(100%-40px)]">
          <div className="overflow-auto p-2">
            <div className="mb-4">
              <h5 className="mb-1">What's the web address (URL)?</h5>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-200 text-sm"
                onChange={(e) => setAddLinkState({
                  ...addLinkState,
                  urlLink: { ...addLinkState.urlLink, targetURL: e.target.value },
                })}
                value={addLinkState.urlLink.targetURL}
                placeholder="Paste the url here..."
              />
            </div>

            <div className="mb-4">
              <h5 className="mb-1">How you want to open the link?</h5>
              <select
                className="w-full p-2 rounded border border-gray-200 text-sm"
                onChange={(e) => setAddLinkState({
                  ...addLinkState,
                  urlLink: { ...addLinkState.urlLink, targetType: e.target.value },
                })}
                value={addLinkState.urlLink.targetType}
              >
                <option value="_self">Open in current window</option>
                <option value="_blank">Open in new tab</option>
              </select>
            </div>

            <div className="mb-4">
              <h5 className="mb-1">Link relations</h5>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inp_noopener"
                    checked={addLinkState.urlLink.rel.opner}
                    onChange={() => setAddLinkState({
                      ...addLinkState,
                      urlLink: {
                        ...addLinkState.urlLink,
                        rel: { ...addLinkState.urlLink.rel, opner: !addLinkState.urlLink.rel.opner },
                      },
                    })}
                  />
                  <label htmlFor="inp_noopener" className="ml-2 text-xs">Block access to source</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inp_noreferrer"
                    checked={addLinkState.urlLink.rel.refer}
                    onChange={() => setAddLinkState({
                      ...addLinkState,
                      urlLink: {
                        ...addLinkState.urlLink,
                        rel: { ...addLinkState.urlLink.rel, refer: !addLinkState.urlLink.rel.refer },
                      },
                    })}
                  />
                  <label htmlFor="inp_noreferrer" className="ml-2 text-xs">Hide information about source</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inp_nofollow"
                    checked={addLinkState.urlLink.rel.follow}
                    onChange={() => setAddLinkState({
                      ...addLinkState,
                      urlLink: {
                        ...addLinkState.urlLink,
                        rel: { ...addLinkState.urlLink.rel, follow: !addLinkState.urlLink.rel.follow },
                      },
                    })}
                  />
                  <label htmlFor="inp_nofollow" className="ml-2 text-xs">Skip by search engine</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inp_sponsored"
                    checked={addLinkState.urlLink.rel.sponsored}
                    onChange={() => setAddLinkState({
                      ...addLinkState,
                      urlLink: {
                        ...addLinkState.urlLink,
                        rel: { ...addLinkState.urlLink.rel, sponsored: !addLinkState.urlLink.rel.sponsored },
                      },
                    })}
                  />
                  <label htmlFor="inp_sponsored" className="ml-2 text-xs">Paid / Sponsor/ Affiliate link</label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-t border-gray-200 p-2 text-right">
            <button
              className="mt-2 bg-blue-600 text-white rounded-full px-4 py-2 text-sm cursor-pointer"
              onClick={applyLinkToSelection}
            >
              Add URL Link
            </button>
          </div>
        </div>
      )}

      {/* Other panels like email, phone, scroll would follow a similar Tailwind structure */}
    </div>
  </div>
</div>

    );
}
