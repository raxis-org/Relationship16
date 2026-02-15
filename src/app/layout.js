import './globals.css'
import { DiagnoseProvider } from '../context/DiagnoseContext'

export const metadata = {
  title: 'RelationCheck 16 | 16タイプ関係性診断',
  description: '二人の相性を16タイプで診断するWebアプリ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <DiagnoseProvider>
          {children}
        </DiagnoseProvider>
      </body>
    </html>
  )
}
