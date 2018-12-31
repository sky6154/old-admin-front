import React, {Component} from 'react';

import Editor, {createEditorStateWithText, composeDecorators} from 'draft-js-plugins-editor';
import createEmojiPlugin                                      from 'draft-js-emoji-plugin';
import createImagePlugin                                      from 'draft-js-image-plugin';
import createAlignmentPlugin                                  from 'draft-js-alignment-plugin';
import createFocusPlugin                                      from 'draft-js-focus-plugin';
import createResizeablePlugin                                 from 'draft-js-resizeable-plugin';
import createBlockDndPlugin                                   from 'draft-js-drag-n-drop-plugin';
import createToolbarPlugin, {Separator}                       from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
  // AlignBlockDefaultButton,
  // AlignBlockCenterButton,
  // AlignBlockLeftButton,
  // AlignBlockRightButton
}                                                             from 'draft-js-buttons';


import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';

import './css/Editor.css';
import {ImageAddButton}                                       from "./EditorImageAddButton";
import {
  AtomicBlockUtils,
  convertFromRaw,
  EditorState,
} from 'draft-js';

import ReactFileReader from 'react-file-reader';

const emojiPlugin = createEmojiPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const staticToolbarPlugin = createToolbarPlugin();

const {Toolbar} = staticToolbarPlugin;
const {AlignmentTool} = alignmentPlugin;
const {EmojiSuggestions, EmojiSelect} = emojiPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({decorator});

const plugins = [
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  emojiPlugin,
  staticToolbarPlugin
];

export default class MyEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  handleFiles = files =>{
    console.log(files);

    const base64 = files.base64;
    const newEditorState = this.insertImageToEditor(this.state.editorState, base64);

    this.setState({ editorState: newEditorState });
  };

  insertImageToEditor = (editorState, base64) =>{
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      {src: base64},
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity},
    );
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };

  onChange = (editorState) =>{
    this.setState({
      editorState,
    });
  };

  focus = () =>{
    this.editor.focus();
  };

  render(){
    return (
      <div>
        <Toolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <Separator {...externalProps} />
                  <HeadlinesButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <CodeBlockButton {...externalProps} />
                  {/*<AlignBlockDefaultButton {...externalProps} />*/}
                  {/*<AlignBlockCenterButton {...externalProps} />*/}
                  {/*<AlignBlockLeftButton {...externalProps} />*/}
                  {/*<AlignBlockRightButton {...externalProps} />*/}
                </div>
              )
            }
          </Toolbar>
        <div className={"editor"} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) =>{
              this.editor = element;
            }}
          />
          <AlignmentTool />
          <EmojiSuggestions />
        </div>
        <div className={"options"}>
          <EmojiSelect />
          <ImageAddButton editorState={this.state.editorState}
                          onChange={this.onChange}
                          modifier={imagePlugin.addImage} />
          <div style={{display: "inline-block"}} className={"addImage"}>
            <ReactFileReader fileTypes={[".jpg", ".jpeg", ".png"]} base64={true} handleFiles={this.handleFiles}
                             multipleFiles={false}>
              <button className={"addImageButton"} style={{width: "100px"}}>Upload</button>
            </ReactFileReader>
          </div>
        </div>
      </div>
    );
  }
}


class HeadlinesPicker extends Component {
  componentDidMount(){
    setTimeout(() =>{
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render(){
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}

class HeadlinesButton extends Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render(){
    return (
      <div className={"headlineButtonWrapper"}>
        <button onClick={this.onClick} className={"headlineButton"}>
          H
        </button>
      </div>
    );
  }
}
