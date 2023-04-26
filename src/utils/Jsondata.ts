import { SvgPaths } from "./SvgPaths"

export class Jsondata {
    static topFeaturedDatas = [
        {
            image: SvgPaths.rocket,
            bgcolor: "#000000",
            title: "Quick and easy",
            description: "Our downloader helps you quickly download any contents to formats like: MP4, MP3, WEBM, JPEG ..."
        },
        {
            image: SvgPaths.playlist,
            bgcolor: "#000000",
            title: "Multiple content download",
            description: "Our downloader helps you download mulitple or single contents at the same time ..."
        },
        {
            image: SvgPaths.browser,
            bgcolor: "#000000",
            title: "Supports all devices",
            description: "Our website works well on all platforms such as Windows, Mac or Linux, Android, iPhone ..."
        },
        {
            image: SvgPaths.excited,
            bgcolor: "#000000",
            title: "Free forever",
            description: "Our site is 100% free and always will be. Support us by sending and sharing our site with your friends."
        },

    ]

    static supportedplatforms = [
        {
            image: "/images/android.svg",
            title: "Android",
            bgcolor: "#32DE84",
        },
        {
            image: "/images/apple-ios.svg",
            title: "iOS",
            bgcolor: "#000000",
        },
        {
            image: "/images/vector.svg",
            title: "Web",
            bgcolor: "#0078D7",
        },
        {
            image: "/images/microsoft-windows-classic.svg",
            title: "Windows 7",
            bgcolor: "#91C300",
        },
        {
            image: "/images/microsoft-internet-explorer.svg",
            title: "Windows 10",
            bgcolor: "#00B4F1",
        },
        {
            image: "/images/ubuntu.svg",
            title: "Ubunto",
            bgcolor: "#DE4815",
        },
        {
            image: "/images/google-chrome.svg",
            title: "ChromeOS",
            bgcolor: "#FF0000",
        },
        {
            image: "/images/apple-find.svg",
            title: "MacOS",
            bgcolor: "#000000",
        },


    ]

    static supportedTypes = [
        {
            title: "MP4",
            bgcolor: "#32DE84",
        },
        {
            title: "WEBM",
            bgcolor: "#0078D7",
        },
        {
            title: "MP3",
            bgcolor: "#91C300",
        },
        {
            title: "JPEG",
            bgcolor: "#00B4F1",
        },
        {
            title: "M4A",
            bgcolor: "#DE4815",
        },
        {
            title: "OPUS",
            bgcolor: "#4285F4",
        },
        {
            title: "JPG",
            bgcolor: "#000000",
        },
    ]

    static supportedWebsites = [
        {
            image: SvgPaths.youtube,
            platform: "Youtube Downloader",
            bgcolor: "#FF0000",
            link: "youtube",
            shortName: "YT",
            videoTypes: "video / playlist / shorts links",
        },
        {
            image: SvgPaths.instagram,
            platform: "Instagram Downloader",
            bgcolor: "#833AB4",
            link: "instagram",
            shortName: "IG",
            videoTypes: "video / images / reels / story links"
        },
        {
            image: SvgPaths.facebook,
            platform: "Facebook Downloader",
            bgcolor: "#2374e1",
            link: "facebook",
            shortName: "FB",
            videoTypes: "video links"
        },
        {
            image: SvgPaths.tiktok,
            platform: "Tiktok Downloader",
            bgcolor: "#000000",
            link: "tiktok",
            shortName: "TT",
            videoTypes: "video links"
        },
    ]

    static faqDatas = [
        {
            question: "What is All Downloader?",
            answer: "It's a free website to download various social platform's content online. We support mp4, mp3, webm, jpeg, png type download with best quality.",
            borderHeight: "60px"
        },
        {
            question: "How to download videos?",
            answer: "It's easy!! Just follow the steps-",
            steps: [
                "1) Go to the website.",
                "2) Paste the link.",
                "3) Click on Download."
            ],
            borderHeight: "120px"
        },
        {
            question: "Does it support multiple file downloads?",
            answer: "Yes It does, You can download multiple contents from platforms such as Youtube, Instagram. Follow this steps -",
            steps: [
                "1) Select the contents you want to download.",
                "2) Select individal quality for the contents.",
                "3) Click on Download Selected button and wait for the download getting started."
            ],
            borderHeight: "120px"
        },
        {
            question: "Is All Downloader a limited number of uses",
            answer: "Our downloader tool allows you to download unlimited contents and all for free.",
            borderHeight: "60px"
        },
        {
            question: "What formats does All Downloader allow to download?",
            answer: "We support download content from different platform in a variety of formats like: MP4, WEBM, MP3, M4A, JPEG, JPG, PNG etc.",
            borderHeight: "60px"
        },
        {
            question: "Does All Downloader work on Mobile phones?",
            answer: "Yes, You can download contents from mobile website. We also Support PWA. So you can install All Downloader as an application in your phone.",
            borderHeight: "60px"
        }
    ]


}