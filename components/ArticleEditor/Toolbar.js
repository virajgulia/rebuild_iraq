import React, { UseState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Divider from '@material-ui/core/Divider';
import {
    FormatBold,
    FormatItalic,
    FormatUnderlinedRounded,
    FormatQuote,
    FormatListBulletedRounded,
    FormatListNumberedOutlined,
    InsertPhoto
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
    },
    divider: {
        margin: theme.spacing(1, 0.5),
    },
}));

const ArticleToolbar = () => {

    const classes = useStyles();

    const [textType, setTextType] = React.useState('paragraph');
    const [block, setBlock] = React.useState('');
    const [formats, setFormats] = React.useState(() => ['']);

    const handleTextType = (event, newTextType) => {
        setTextType(newTextType)
    }

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats)
    };

    const handleBlock = (event, newBlock) => {
        setBlock(newBlock)
    };

    return (
        <div className="article-toolbar">
            <Toolbar>
                <ToggleButtonGroup
                    exclusive
                    className="toolbar-button-group"
                    value={textType}
                    onChange={handleTextType}
                >
                    <ToggleButton
                        className="toolbar-custom-button"
                        value="paragraph"
                    >
                        p
                    </ToggleButton>
                    <ToggleButton
                        className="toolbar-custom-button"
                        value="header"
                    >
                        <div>
                            h1
                        </div>
                    </ToggleButton>
                </ToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <ToggleButtonGroup
                    className="toolbar-button-group"
                    value={formats}
                    onChange={handleFormat}
                >
                    <ToggleButton value="bold">
                        <FormatBold />
                    </ToggleButton>
                    <ToggleButton value="italic">
                        <FormatItalic />
                    </ToggleButton>
                    <ToggleButton value="underlined">
                        <FormatUnderlinedRounded />
                    </ToggleButton>
                </ToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <ToggleButtonGroup
                    className="toolbar-button-group"
                    exclusive
                    value={block}
                    onChange={handleBlock}
                >
                    <ToggleButton
                        value="block-quote"
                    >
                        <FormatQuote />
                    </ToggleButton>
                    <ToggleButton
                        value="bulleted-list"
                    >
                        <FormatListBulletedRounded />
                    </ToggleButton>
                    <ToggleButton
                        value="numbered-list"
                    >
                        <FormatListNumberedOutlined />
                    </ToggleButton>
                </ToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <ToggleButtonGroup className="toolbar-button-group">
                    <ToggleButton>
                        <InsertPhoto />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Toolbar>
        </div>
    )
}

export default ArticleToolbar;