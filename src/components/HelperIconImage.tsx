import { Box, Tooltip, TooltipProps } from '@mui/material';
import Image from 'next/image';

type HelperIconImageProps = {
  label: TooltipProps['title'];
  src: string;
};

const HelperIconImage = ({ label, src }: HelperIconImageProps) => (
  <Tooltip arrow aria-label={label as string} title={label}>
    <Box marginX={2}>
      <Image src={src} width={33} height={33} alt={label as string} />
    </Box>
  </Tooltip>
);

export default HelperIconImage;
