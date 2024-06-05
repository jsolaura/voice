import React from 'react';
import BookmarkIcon from "@/assets/images/bookmark.png";
import BookmarkWhiteIcon from "@/assets/images/bookmark_white.svg";
import ExportIcon from "@/assets/images/export.png";
import ExportWhiteIcon from "@/assets/images/export_white.svg";

interface ShareExportButtonsProps {
    className?: string;
    disabled?: boolean;
}
const ShareExportButtons = ({ className, disabled = true }: ShareExportButtonsProps) => {
    return (
        <div className={className}>
            <button>
                <img src={disabled ? BookmarkIcon : BookmarkWhiteIcon} alt='bookmarkIcon' />
            </button>
            <button>
                <img src={disabled ? ExportIcon : ExportWhiteIcon} alt='exportIcon' />
            </button>
        </div>
    );
};

export default ShareExportButtons;