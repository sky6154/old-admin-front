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
  AlignBlockDefaultButton,
  AlignBlockCenterButton,
  AlignBlockLeftButton,
  AlignBlockRightButton
}                                                             from 'draft-js-buttons';


import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import './css/Editor.css';
import {ImageAddButton}                                       from "./EditorImageAddButton";

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


export default class SimpleEmojiEditor extends Component {
  state = {
    editorState: createEditorStateWithText(''),
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
                  <AlignBlockDefaultButton {...externalProps} />
                  <AlignBlockCenterButton {...externalProps} />
                  <AlignBlockLeftButton {...externalProps} />
                  <AlignBlockRightButton {...externalProps} />
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
          <EmojiSuggestions />
        </div>
        <div className={"options"}>
          <EmojiSelect />
          <ImageAddButton editorState={this.state.editorState}
                          onChange={this.onChange}
                          modifier={imagePlugin.addImage} />
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
