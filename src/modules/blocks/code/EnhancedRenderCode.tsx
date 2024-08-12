import * as React from 'react';

import type { SxProps } from '@mui/joy/styles/types';
import { Box, ColorPaletteProp, Typography } from '@mui/joy';
import CodeIcon from '@mui/icons-material/Code';

import type { ContentScaling } from '~/common/app.theme';
import { TooltipOutlined } from '~/common/components/TooltipOutlined';

import { RenderCodeMemo } from './RenderCode';
import { enhancedCodePanelTitleTooltipSx, RenderCodePanelFrame } from './panel/RenderCodePanelFrame';


export function EnhancedRenderCode(props: {
  semiStableId: string | undefined,

  title: string,
  code: string,
  isPartial: boolean,

  fitScreen?: boolean,
  initialShowHTML?: boolean,
  noCopyButton?: boolean,
  optimizeLightweight?: boolean,

  codeSx?: SxProps,

  language?: string,
  color?: ColorPaletteProp;
  contentScaling: ContentScaling;

  onLiveFileCreate?: () => void,
}) {

  // state
  // const [isCopied, setIsCopied] = React.useState(false);


  // const handleCopyToClipboard = () => {
  //   copyToClipboard(props.code, 'Code');
  //   setIsCopied(true);
  //   setTimeout(() => setIsCopied(false), 2000);
  // };
  //
  // const handleDownload = () => {
  //   const blob = new Blob([props.code], { type: 'text/plain' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `${props.title || 'code'}.${props.language}`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  const headerTooltipContents = React.useMemo(() => (
    <Box sx={enhancedCodePanelTitleTooltipSx}>
      {/* This is what we have */}
      <div>Title</div>
      <div>{props.title}</div>
      <div>Language</div>
      <div>{props.language}</div>
      <div>Code Length</div>
      <div>{props.code.length} characters</div>
      <div>Code Lines</div>
      <div>{props.code.split('\n').length} lines</div>
      <div>semiStableId</div>
      <div>{props.semiStableId || '(none)'}</div>
      {/* This is what attachments carry */}
      {/*<div>Attachment Title</div>*/}
      {/*<div>{fragment.title}</div>*/}
      {/*<div>Doc Title</div>*/}
      {/*<div>{fragmentDocPart.l1Title}</div>*/}
      {/*<div>Identifier</div>*/}
      {/*<div>{fragmentDocPart.ref}</div>*/}
      {/*<div>Render type</div>*/}
      {/*<div>{fragmentDocPart.vdt}</div>*/}
      {/*<div>Text Mime type</div>*/}
      {/*<div>{fragmentDocPart.data?.mimeType || '(unknown)'}</div>*/}
      {/*<div>Text Buffer Id</div>*/}
      {/*<div>{fragmentId}</div>*/}
    </Box>
  ), [props.code, props.language, props.semiStableId, props.title]);

  const headerRow = React.useMemo(() => <>

    <Typography level='title-sm' startDecorator={<CodeIcon />}>
      <TooltipOutlined placement='top-start' color='neutral' title={headerTooltipContents}>
        {/*<span>{fragmentDocPart.meta?.srcFileName || fragmentDocPart.l1Title || fragmentDocPart.ref}</span>*/}
        <span>{props.title || 'Code'}</span>
      </TooltipOutlined>
    </Typography>

    {/*<Box sx={{ display: 'flex', gap: 1 }}>*/}
    {/*  {!props.noCopyButton && (*/}
    {/*    <Tooltip title={isCopied ? 'Copied!' : 'Copy code'} variant='solid'>*/}
    {/*      <IconButton*/}
    {/*        size='sm'*/}
    {/*        variant='outlined'*/}
    {/*        color={isCopied ? 'success' : 'neutral'}*/}
    {/*        onClick={handleCopyToClipboard}*/}
    {/*      >*/}
    {/*        <ContentCopyIcon />*/}
    {/*      </IconButton>*/}
    {/*    </Tooltip>*/}
    {/*  )}*/}
    {/*  <Tooltip title='Download code' variant='solid'>*/}
    {/*    <IconButton*/}
    {/*      size='sm'*/}
    {/*      variant='outlined'*/}
    {/*      color='neutral'*/}
    {/*      onClick={handleDownload}*/}
    {/*    >*/}
    {/*      <FileDownloadIcon />*/}
    {/*    </IconButton>*/}
    {/*  </Tooltip>*/}
    {/*</Box>*/}
  </>, [headerTooltipContents, props.title]);


  // const toolbarRow = React.useMemo(() => <>
  //   {props.onLiveFileCreate && (
  //     <Button
  //       size='sm'
  //       variant='outlined'
  //       color='neutral'
  //       startDecorator={<LiveHelpIcon />}
  //       onClick={props.onLiveFileCreate}
  //     >
  //       Create Live File
  //     </Button>
  //   )}
  //   {/* Add more toolbar items here */}
  // </>, [props.onLiveFileCreate]);


  const patchedCodeSx = React.useMemo((): SxProps => ({
    ...props.codeSx,
    my: undefined,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  }), [props.codeSx]);


  return (
    <RenderCodePanelFrame
      color={props.color || 'neutral'}
      noShadow
      // frameVariant='solid'
      contentScaling={props.contentScaling}
      headerRow={headerRow}
      // subHeaderInline={subHeaderInline}
      // toolbarRow={toolbarRow}
    >

      <RenderCodeMemo
        semiStableId={props.semiStableId}
        code={props.code} title={props.title} isPartial={props.isPartial}
        fitScreen={props.fitScreen}
        initialShowHTML={props.initialShowHTML}
        noCopyButton={props.noCopyButton}
        optimizeLightweight={props.optimizeLightweight}
        sx={patchedCodeSx}
      />

    </RenderCodePanelFrame>
  );
}