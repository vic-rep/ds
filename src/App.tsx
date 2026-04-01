import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { Sidebar } from './shell/Sidebar'
import { Header } from './shell/Header'
import { PreviewFrame } from './shell/PreviewFrame'
import { ColorsPage } from './sections/foundation/Colors'
import { TypographyPage } from './sections/foundation/Typography'
import { SpacingPage } from './sections/foundation/Spacing'
import { TokensPage } from './sections/foundation/Tokens'
import { IconsPage } from './sections/foundation/Icons'
import { HomePage } from './sections/HomePage'
import { registry } from './registry'
import './styles/layout.css'

function ProtoFullscreen() {
  const { id } = useParams<{ id: string }>()
  const entry = registry.find(c => c.id === id && c.tier === 'prototypes')
  if (!entry) return <Navigate to="/" replace />
  const Component = entry.component
  return <Component />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/proto/:id" element={<ProtoFullscreen />} />
        <Route path="*" element={
          <div className="app-shell">
            <Header />
            <Sidebar />
            <main className="shell-main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/foundation/colors" element={<ColorsPage />} />
                <Route path="/foundation/typography" element={<TypographyPage />} />
                <Route path="/foundation/spacing" element={<SpacingPage />} />
                <Route path="/foundation/tokens" element={<TokensPage />} />
                <Route path="/foundation/icons" element={<IconsPage />} />
                <Route path="/:tier/:id" element={<PreviewFrame />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}
