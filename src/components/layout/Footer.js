import RedHeartIcon from '@/assets/icons/heart-red.svg';

export default function Footer(props) {
    return (
        <div className="container container-no-margin" {...props}>
            <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mb-12 pt-5 border-t-2 border-t-neutral-200 dark:border-t-neutral-800">
                <p className="flex items-center gap-2">
                    <span>Made with</span>
                    <RedHeartIcon width="18" height="18" />
                    <span>by <a className="link font-bold" href="https://passthemayo.dev">PassTheMayo</a></span>
                </p>
                <a className="badge badge-blue badge-hover font-mono" href={`https://github.com/mcstatus-io/website/commit/${process.env.NEXT_PUBLIC_COMMIT_ID}`} title="Current Live Commit ID">MCS-{process.env.NEXT_PUBLIC_COMMIT_ID.substring(0, 7)}</a>
            </footer>
        </div>
    );
}