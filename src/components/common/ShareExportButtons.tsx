import React from 'react';
import BookmarkIcon from "@/assets/images/bookmark.png";
import BookmarkWhiteIcon from "@/assets/images/bookmark_white.svg";
import BookmarkFillIcon from "@/assets/images/bookmark_fill.svg";
import ExportIcon from "@/assets/images/export.png";
import ExportWhiteIcon from "@/assets/images/export_white.svg";

interface ShareExportButtonsProps {
    className?: string;
    disabled?: boolean;
    isSaved?: boolean;
}
const ShareExportButtons = ({ className, disabled = true, isSaved = false }: ShareExportButtonsProps) => {
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