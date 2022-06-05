import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box } from '@mui/material'
import LoneInput from './LoneInput'
import Features from './Features'
import GridImages from './GridImages'
import { InputsProvider, inputsReducer } from 'context/inputs'
import { createUniqId, handleSubmitData } from 'utils/helper'
import { GroupName } from 'interfaces/inputs'
import { UnitInputElement } from 'interfaces/input-unit'

const gridModel = {
  url: '',
  isVideo: false,
  filename: 'hey',
}

const initialInputs = {
  grid: {
    grid1: { ...gridModel },
    grid2: { ...gridModel },
    grid3: { ...gridModel },
  },
  featureSlides: [
    {
      id: createUniqId(),
      description: 'say',
      filename: 'my',
      heading: 'name',
    },
  ],
  subtitle: 'Hello',
  fit: 'the',
  sizing: 'world',
}

export default function Content() {
  const [inputs, inputsDispatch] = React.useReducer(
    inputsReducer,
    initialInputs
  )

  const handleChangeContent = (e: React.MouseEvent) => {
    // e.preventDefault()
    // const newContent = `New Content ${Math.random()}`
    // setContent(newContent)
    console.log('Clicked submit button')
  }

  const generateJSON = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('submit')

    const elements = (e.target as HTMLFormElement).elements
    let indexedElements: UnitInputElement[] = []
    for (let index = 0; index < elements.length; index++) {
      indexedElements.push(elements[index] as UnitInputElement)
    }

    console.log(indexedElements)

    const newState = handleSubmitData(inputs, indexedElements)
    console.log(newState)
  }

  return (
    <>
      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by email address, phone number, or user UID"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }}>
                  Add user
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          No users for this project yet
        </Typography>
      </Paper>

      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by email address, phone number, or user UID"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }}>
                  Add user
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Box
          component="form"
          sx={{
            my: 5,
            mx: 2,
          }}
          noValidate
          autoComplete="off"
          onSubmit={generateJSON}
        >
          <InputsProvider value={[inputs, inputsDispatch]}>
            <LoneInput input={inputs.subtitle} loneType={GroupName.subtitle} />
            <GridImages />
            <Features />
            <LoneInput input={inputs.fit} loneType={GroupName.fit} />
            <LoneInput input={inputs.sizing} loneType={GroupName.sizing} />
          </InputsProvider>

          <Button type="submit" onClick={handleChangeContent}>
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  )
}
