import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MonsterBall from '@material-ui/icons/Restaurant';
import Versus from '@material-ui/icons/SmokeFree';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import VersusTabs from './VersusTabs'
import { waza, PokemonData } from './shared'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface Props {
  wazas: waza[];
  pokemons: PokemonData[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonPrevent(props: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="off"
          variant="fullWidth"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<Versus />} aria-label="versus" {...a11yProps(0)} />
          <Tab icon={<MonsterBall />} aria-label="pokemon" {...a11yProps(5)} />
          <Tab icon={<DescriptionOutlinedIcon />} aria-label="log" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <VersusTabs wazas={props.wazas} pokemons={props.pokemons}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}