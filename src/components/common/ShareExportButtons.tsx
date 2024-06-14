import React from 'react';
import BookmarkIcon from "@/assets/images/bookmark.png";
import BookmarkWhiteIcon from "@/assets/images/bookmark_white.svg";
import BookmarkFillIcon from "@/assets/images/bookmark_fill.svg";
import ExportIcon from "@/assets/images/export.png";
import ExportWhiteIcon from "@/assets/images/export_white.svg";

interface ShareExportButtonsProps {
    className?: string;
    disabled?: boolean;
    savedYn?: string;
}
const ShareExportButtons = ({ className, disabled = true, savedYn }: ShareExportButtonsProps) => {
    const isSaved = savedYn === 'y';
    return (
        <div className={className}>
            <button>
                <img src={disabled ? BookmarkIcon : isSaved ? BookmarkFillIcon : BookmarkWhiteIcon} alt='bookmarkIcon' />
            </button>
            <button>
                <img src={disabled ? ExportIcon : ExportWhiteIcon} alt='exportIcon' />
            </button>
        </div>
    );
};

export default ShareExportButtons;