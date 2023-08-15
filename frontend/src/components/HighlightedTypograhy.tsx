import { Typography } from '@mui/material';

export const HighlightedTypography = (props: {
  text: string;
  highlight: string;
}) => {
  const { text, highlight } = props;
  const highlightStartIndex = text
    .toLowerCase()
    .indexOf(highlight.toLowerCase());
  const highlightEndIndex = highlightStartIndex + highlight.length;

  return (
    <>
      <Typography variant="caption">
        {text.slice(0, highlightStartIndex)}
      </Typography>
      <Typography variant="caption" fontWeight="bold">
        {text.slice(highlightStartIndex, highlightEndIndex)}
      </Typography>
      <Typography variant="caption">
        {text.slice(highlightEndIndex, text.length)}
      </Typography>
    </>
  );
};

export type HighlightedTypographyProps = React.ComponentProps<
  typeof HighlightedTypography
>;
