import * as React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@material-ui/core';
function Header() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Converter
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
