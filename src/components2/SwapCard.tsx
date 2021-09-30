import React, { useEffect, useRef } from 'react'
import { VariantType, useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { RootState } from '../app/rootReducer'
import { styled } from "@mui/material/styles";
// import clsx from 'clsx'
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import { red, blue, yellow, green, common } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded'
import WarningIcon from '@mui/icons-material/Warning'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import BidCard from './BidCard'
import { submitReceiptTx, submitDisputeTx, queryBids } from '../api/peerswapAPI'
import { formatDateTime, shortenHex } from '../utils/stringUtils'
import useCopyToClipboard from '../hooks/useCopyToClipboard'
import Paper from "@mui/material/Paper";


const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.9,
  },
}));

const statusColorBackground = {
  open: blue[700],
  exchanging: yellow[700],
  disputing: red[700],
  complete: green[700],
}

const statusColorText = {
  open: common.white,
  exchanging: common.black,
  disputing: common.white,
  complete: common.white,
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function SwapCard({ swap, opened }) {
  const isCurrent = useRef(true)
  const [, copy] = useCopyToClipboard()
  const { wallet } = useSelector((state: RootState) => state.wallet)
  const [expanded, setExpanded] = React.useState(opened)
  const [bids, setBids] = React.useState([])
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    return () => {
      isCurrent.current = false
    }
  }, [])

  useEffect(() => {
    queryBids(swap.id).then((data) => {
      if (isCurrent.current) {
        setBids(data.bids)
      }
    })
  }, [])

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant })
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ width: "100%" }} elevation={9}>
      <CardHeader
        avatar={
          <Avatar aria-label="swap-initiator" sx={{ bgcolor: red[500] }}>
            <SwapVertRoundedIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={swap.initiatorAlias}
        subheader={formatDateTime(swap.createdAt)}
      />
      <CardContent>
        <Paper elevation={5} sx={{ p: (theme) => `${theme.spacing(2)}` }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="body1" color="textPrimary" component="div">
                Status:
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={swap.status}
                size="small"
                style={{
                  backgroundColor: statusColorBackground[swap.status],
                  color: statusColorText[swap.status],
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="body1" color="textPrimary" component="div">
                Swap type:
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={swap.swapType} size="small" />
            </Grid>
          </Grid>
          {swap.tokenOffered && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Token Offered:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={swap.tokenOffered} size="small" />
              </Grid>
            </Grid>
          )}
          {swap.amountOffered && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Amount Offered:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={swap.amountOffered} size="small" />
              </Grid>
            </Grid>
          )}
          {swap.tokenRequested && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Token Requested:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={swap.tokenRequested} size="small" />
              </Grid>
            </Grid>
          )}
          {swap.amountRequested && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Amount Requested:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={swap.amountRequested} size="small" />
              </Grid>
            </Grid>
          )}
          {swap.initiatorChainAddress && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Chain Address:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={shortenHex(swap.initiatorChainAddress)}
                  size="small"
                  onClick={() => {
                    copy(swap.initiatorChainAddress);
                    handleClickVariant(
                      "success",
                      "Copied address to clipboard"
                    )();
                  }}
                />
              </Grid>
            </Grid>
          )}
          {swap.initiatorChainMemo !== "None" && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Chain Memo:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={swap.initiatorChainMemo}
                  size="small"
                  onClick={() => {
                    copy(swap.initiatorChainMemo);
                    handleClickVariant("success", "Copied memo to clipboard")();
                  }}
                />
              </Grid>
            </Grid>
          )}
          {swap.fixed !== undefined && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Fixed:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={`${swap.fixed}`} size="small" />
              </Grid>
            </Grid>
          )}
          {swap.maxTimeToSend && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  MaxTimeToSend:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={swap.maxTimeToSend / 60 + " Minutes"}
                  size="small"
                />
              </Grid>
            </Grid>
          )}
          {swap.maxTimeToReceive && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  MaxTimeToReceive:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={swap.maxTimeToReceive / 60 + " Minutes"}
                  size="small"
                />
              </Grid>
            </Grid>
          )}
          {swap.initiatorCollateral && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Collateral:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={swap.initiatorCollateral + " DAI"} size="small" />
              </Grid>
            </Grid>
          )}
          {swap.providerCollateral && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Provider Collateral:
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={swap.providerCollateral + " DAI"} size="small" />
              </Grid>
            </Grid>
          )}
          {swap.timeOfAgreement && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Time Of Agreement:
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={formatDateTime(swap.timeOfAgreement)}
                  size="small"
                />
              </Grid>
            </Grid>
          )}
          {swap.acceptedBid && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Accepted Bid:
                </Typography>
              </Grid>
              <Grid item>
                <StyledLink
                  to={`../bid/${swap.acceptedBid}`}
                  // className={classes.link}
                >
                  <Chip
                    label={shortenHex(swap.acceptedBid)}
                    size="small"
                    color="primary"
                    // className={classes.link}
                  />
                </StyledLink>
              </Grid>
            </Grid>
          )}
          {swap.contractId && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Contract:
                </Typography>
              </Grid>
              <Grid item>
                <StyledLink
                  to={`../contract/${swap.contractId}`}
                  // className={classes.link}
                >
                  <Chip
                    label={shortenHex(swap.contractId)}
                    size="small"
                    color="primary"
                    // className={classes.link}
                  />
                </StyledLink>
              </Grid>
            </Grid>
          )}
          {swap.disputeId && (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary" component="div">
                  Dispute:
                </Typography>
              </Grid>
              <Grid item>
                <StyledLink
                  to={`../dispute/${swap.disputeId}`}
                  // className={classes.link}
                >
                  <Chip
                    label={shortenHex(swap.disputeId)}
                    size="small"
                    color="primary"
                    // className={classes.link}
                  />
                </StyledLink>
              </Grid>
            </Grid>
          )}
        </Paper>
      </CardContent>
      <CardActions disableSpacing>
        {wallet.handle !== swap.initiatorAlias && (
          <Tooltip title="bid on this swap" arrow>
            <StyledLink to={`swap/${swap.id}`}>
              <IconButton
                aria-label="bid on this swap"
                disabled={swap.status !== "open"}
              >
                <AddIcon />
              </IconButton>
            </StyledLink>
          </Tooltip>
        )}
        {wallet.handle === swap.initiatorAlias && (
          <Tooltip title="mark swap as successful" arrow>
            <span>
              <IconButton
                aria-label="mark swap as successful"
                disabled={swap.status !== "exchanging"}
                onClick={() => {
                  submitReceiptTx(swap, wallet).then((data: any) => {
                    handleClickVariant("success", data.result.reason)();
                  });
                }}
              >
                <DoneAllIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
        {wallet.handle === swap.initiatorAlias && (
          <Tooltip title="dispute this swap" arrow>
            <span>
              <IconButton
                aria-label="dispute swap"
                disabled={
                  wallet.handle !== swap.user || swap.status !== "exchanging"
                }
                onClick={() => {
                  submitDisputeTx(swap, wallet).then((data: any) => {
                    handleClickVariant("success", data.result.reason)();
                  });
                }}
              >
                <WarningIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="h4"
            color="textSecondary"
            component="div"
            align="center"
          >
            Bids
          </Typography>
          {/* <Divider /> */}
          {bids &&
            bids.map((bid, i) => <BidCard swap={swap} bid={bid} key={i} />)}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default React.memo(SwapCard)