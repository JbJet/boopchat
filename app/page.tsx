"use client"

import type React from "react"

import { useState } from "react"
import {
  MessageCircle,
  Plus,
  Send,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Settings,
  Moon,
  Sun,
  Camera,
  ArrowLeft,
  Info,
  HelpCircle,
  UserCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

type Screen = "landing" | "register" | "login" | "chat" | "about" | "operation" | "settings" | "profile" | "new-message"
type Theme = "light" | "dark"

interface Message {
  id: string
  user: string
  content: string
  timestamp: string
}

interface UserProfile {
  name: string
  email: string
  avatar?: string
  bio: string
}

export default function BoopChat() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing")
  const [theme, setTheme] = useState<Theme>("dark")
  const [showPassword, setShowPassword] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Usuário",
    email: "usuario@email.com",
    bio: "Olá! Estou usando o BoopChat.",
  })

  const themeClasses = {
    dark: {
      bg: "bg-slate-800",
      bgSecondary: "bg-slate-700",
      bgTertiary: "bg-slate-900",
      bgCard: "bg-slate-600",
      text: "text-white",
      textSecondary: "text-slate-300",
      textMuted: "text-slate-400",
      border: "border-slate-700",
      borderSecondary: "border-slate-500",
    },
    light: {
      bg: "bg-gray-50",
      bgSecondary: "bg-white",
      bgTertiary: "bg-gray-100",
      bgCard: "bg-white",
      text: "text-gray-900",
      textSecondary: "text-gray-700",
      textMuted: "text-gray-500",
      border: "border-gray-200",
      borderSecondary: "border-gray-300",
    },
  }

  const t = themeClasses[theme]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: userProfile.name,
        content: newMessage,
        timestamp: new Date().toLocaleString("pt-BR"),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUserProfile((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const renderLanding = () => (
    <div className={`min-h-screen ${t.bg} relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-full w-32 opacity-20">
        <div className="h-1/3 w-16 bg-cyan-300 ml-auto"></div>
        <div className="h-2/3 w-24 bg-cyan-200 ml-auto mt-4"></div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-slate-800" />
          </div>
          <h1 className={`text-2xl font-bold ${t.text}`}>BoopChat</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setCurrentScreen("operation")}
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")} transition-colors`}
          >
            Como funciona?
          </button>
          <button
            onClick={() => setCurrentScreen("about")}
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")} transition-colors`}
          >
            Sobre o projeto
          </button>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="ghost"
            size="sm"
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")}`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-800"
            onClick={() => setCurrentScreen("register")}
          >
            Inicie uma conversa
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-2xl text-center">
          <h2 className={`text-5xl md:text-6xl font-bold ${t.text} mb-6 leading-tight`}>
            Converse com o mundo!
            <br />
            <span className={`${t.textSecondary} italic`}>Sem rastros,</span>
            <br />
            <span className="text-cyan-400">Só boop!</span>
          </h2>

          <p className={`text-xl ${t.textSecondary} mb-8 max-w-lg mx-auto`}>
            Conecte-se de forma anônima e segura. Suas conversas, sua privacidade.
          </p>

          <Button
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setCurrentScreen("register")}
          >
            Inicie uma nova conversa
            <MessageCircle className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <p className={`${t.textMuted} text-sm`}>By Dugtrio</p>
      </footer>
    </div>
  )

  const renderAbout = () => (
    <div className={`min-h-screen ${t.bg} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentScreen("landing")}
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
            <Info className="w-6 h-6 text-slate-800" />
          </div>
          <h1 className={`text-3xl font-bold ${t.text}`}>Sobre o BoopChat</h1>
        </div>

        <Card className={`${t.bgCard} ${t.borderSecondary} shadow-2xl`}>
          <CardContent className="p-8 space-y-6">
            <div>
              <h2 className={`text-2xl font-semibold ${t.text} mb-4`}>Nossa Missão</h2>
              <p className={`${t.textSecondary} text-lg leading-relaxed`}>
                O BoopChat foi criado com o objetivo de proporcionar comunicação segura e privada. Acreditamos que todos
                têm direito à privacidade digital e conversas sem rastros.
              </p>
            </div>

            <Separator className={t.borderSecondary} />

            <div>
              <h2 className={`text-2xl font-semibold ${t.text} mb-4`}>Recursos Principais</h2>
              <ul className={`${t.textSecondary} space-y-3`}>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Conversas criptografadas de ponta a ponta</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Sem armazenamento de dados pessoais</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Interface simples e intuitiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Código aberto e transparente</span>
                </li>
              </ul>
            </div>

            <Separator className={t.borderSecondary} />

            <div>
              <h2 className={`text-2xl font-semibold ${t.text} mb-4`}>Desenvolvido por</h2>
              <p className={`${t.textSecondary} text-lg`}>
                Dugtrio - Comprometido com a privacidade e segurança digital.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderOperation = () => (
    <div className={`min-h-screen ${t.bg} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentScreen("landing")}
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-slate-800" />
          </div>
          <h1 className={`text-3xl font-bold ${t.text}`}>Como Funciona</h1>
        </div>

        <div className="grid gap-6">
          {[
            {
              step: "1",
              title: "Cadastre-se",
              description: "Crie sua conta com apenas email e senha. Não coletamos dados pessoais desnecessários.",
            },
            {
              step: "2",
              title: "Inicie uma Conversa",
              description: "Clique em 'Nova Conversa' e comece a conversar de forma segura e privada.",
            },
            {
              step: "3",
              title: "Converse com Segurança",
              description: "Todas as mensagens são criptografadas e não ficam armazenadas em nossos servidores.",
            },
            {
              step: "4",
              title: "Privacidade Total",
              description: "Suas conversas são temporárias e desaparecem automaticamente após um período.",
            },
          ].map((item) => (
            <Card key={item.step} className={`${t.bgCard} ${t.borderSecondary} shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-slate-800 font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${t.text} mb-2`}>{item.title}</h3>
                    <p className={`${t.textSecondary} leading-relaxed`}>{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className={`min-h-screen ${t.bg} p-6`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentScreen("chat")}
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-slate-800" />
          </div>
          <h1 className={`text-3xl font-bold ${t.text}`}>Configurações</h1>
        </div>

        <Card className={`${t.bgCard} ${t.borderSecondary} shadow-2xl`}>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-semibold ${t.text}`}>Tema</h3>
                <p className={`${t.textMuted} text-sm`}>Escolha entre tema claro ou escuro</p>
              </div>
              <div className="flex items-center gap-3">
                <Sun className={`w-4 h-4 ${theme === "light" ? "text-cyan-400" : t.textMuted}`} />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
                <Moon className={`w-4 h-4 ${theme === "dark" ? "text-cyan-400" : t.textMuted}`} />
              </div>
            </div>

            <Separator className={t.borderSecondary} />

            <div>
              <h3 className={`text-lg font-semibold ${t.text} mb-4`}>Privacidade</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={t.textSecondary}>Excluir mensagens automaticamente</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className={t.textSecondary}>Notificações de leitura</span>
                  <Switch />
                </div>
              </div>
            </div>

            <Separator className={t.borderSecondary} />

            <div>
              <h3 className={`text-lg font-semibold ${t.text} mb-4`}>Conta</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className={`w-full justify-start ${t.borderSecondary} ${t.textSecondary}`}
                  onClick={() => setCurrentScreen("profile")}
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button variant="outline" className="w-full justify-start border-red-500 text-red-500 hover:bg-red-50">
                  Excluir Conta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className={`min-h-screen ${t.bg} p-6`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentScreen("settings")}
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-slate-800" />
          </div>
          <h1 className={`text-3xl font-bold ${t.text}`}>Perfil</h1>
        </div>

        <Card className={`${t.bgCard} ${t.borderSecondary} shadow-2xl`}>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-slate-600 text-white text-2xl">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 bg-cyan-400 rounded-full p-2 cursor-pointer hover:bg-cyan-500 transition-colors">
                  <Camera className="w-4 h-4 text-slate-800" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className={`${t.text} font-medium`}>Nome</Label>
                <Input
                  value={userProfile.name}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, name: e.target.value }))}
                  className={`mt-1 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white" : "bg-white border-gray-300"}`}
                />
              </div>

              <div>
                <Label className={`${t.text} font-medium`}>Email</Label>
                <Input
                  value={userProfile.email}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, email: e.target.value }))}
                  className={`mt-1 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white" : "bg-white border-gray-300"}`}
                />
              </div>

              <div>
                <Label className={`${t.text} font-medium`}>Bio</Label>
                <Textarea
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  className={`mt-1 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white" : "bg-white border-gray-300"}`}
                  placeholder="Conte um pouco sobre você..."
                  rows={3}
                />
              </div>
            </div>

            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderNewMessage = () => (
    <div className={`min-h-screen ${t.bg} p-6`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentScreen("chat")}
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
            <Plus className="w-6 h-6 text-slate-800" />
          </div>
          <h1 className={`text-3xl font-bold ${t.text}`}>Nova Conversa</h1>
        </div>

        <Card className={`${t.bgCard} ${t.borderSecondary} shadow-2xl`}>
          <CardContent className="p-6 space-y-6">
            <div>
              <Label className={`${t.text} font-medium`}>Para</Label>
              <Input
                placeholder="Digite o email ou nome de usuário..."
                className={`mt-1 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white" : "bg-white border-gray-300"}`}
              />
            </div>

            <div>
              <Label className={`${t.text} font-medium`}>Assunto (opcional)</Label>
              <Input
                placeholder="Assunto da conversa..."
                className={`mt-1 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white" : "bg-white border-gray-300"}`}
              />
            </div>

            <div>
              <Label className={`${t.text} font-medium`}>Primeira mensagem</Label>
              <Textarea
                placeholder="Digite sua mensagem..."
                className={`mt-1 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white" : "bg-white border-gray-300"}`}
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold"
                onClick={() => setCurrentScreen("chat")}
              >
                Iniciar Conversa
              </Button>
              <Button
                variant="outline"
                className={`${t.borderSecondary} ${t.textSecondary}`}
                onClick={() => setCurrentScreen("chat")}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderRegister = () => (
    <div className={`min-h-screen ${t.bgSecondary} flex items-center justify-center p-6`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-slate-800" />
          </div>
          <h1 className={`text-3xl font-bold ${t.text} mb-2`}>BoopChat</h1>
          <Button
            variant="ghost"
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")} hover:${t.bgTertiary} mb-4`}
            onClick={() => setCurrentScreen("landing")}
          >
            ← Voltar ao início
          </Button>
        </div>

        <Card className={`${t.bgCard} ${t.borderSecondary} shadow-2xl`}>
          <CardHeader className="text-center">
            <CardTitle className={`text-2xl ${t.text}`}>Cadastrar nova conta</CardTitle>
            <CardDescription className={t.textSecondary}>Crie sua conta para começar a conversar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className={`${t.text} font-medium`}>
                Nome de usuário
              </Label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${t.textMuted}`} />
                <Input
                  id="username"
                  className={`pl-10 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white placeholder:text-slate-400" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"} focus:border-cyan-400 focus:ring-cyan-400`}
                  placeholder="Seu nome de usuário"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={`${t.text} font-medium`}>
                Email
              </Label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${t.textMuted}`} />
                <Input
                  id="email"
                  type="email"
                  className={`pl-10 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white placeholder:text-slate-400" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"} focus:border-cyan-400 focus:ring-cyan-400`}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={`${t.text} font-medium`}>
                Senha
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${t.textMuted}`} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`pl-10 pr-10 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white placeholder:text-slate-400" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"} focus:border-cyan-400 focus:ring-cyan-400`}
                  placeholder="Sua senha segura"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${t.textMuted} hover:${t.textSecondary}`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              className={`w-full ${theme === "dark" ? "bg-slate-800 hover:bg-slate-900" : "bg-gray-800 hover:bg-gray-900"} text-white font-semibold py-3 rounded-lg transition-all duration-200`}
              onClick={() => setCurrentScreen("chat")}
            >
              CADASTRAR
            </Button>

            <div className="text-center">
              <p className={`${t.textSecondary} text-sm`}>
                Já Cadastrado?{" "}
                <button
                  onClick={() => setCurrentScreen("login")}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium"
                >
                  Entrar em sua conta!
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderLogin = () => (
    <div className={`min-h-screen ${t.bgSecondary} flex items-center justify-center p-6`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-slate-800" />
          </div>
          <h1 className={`text-3xl font-bold ${t.text} mb-2`}>BoopChat</h1>
          <Button
            variant="ghost"
            className={`${t.textSecondary} hover:${t.text.replace("text-", "text-")} hover:${t.bgTertiary} mb-4`}
            onClick={() => setCurrentScreen("landing")}
          >
            ← Voltar ao início
          </Button>
        </div>

        <Card className={`${t.bgCard} ${t.borderSecondary} shadow-2xl`}>
          <CardHeader className="text-center">
            <CardTitle className={`text-2xl ${t.text}`}>Entrar em sua conta</CardTitle>
            <CardDescription className={t.textSecondary}>Bem-vindo de volta! Faça login para continuar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="login-email" className={`${t.text} font-medium`}>
                Email
              </Label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${t.textMuted}`} />
                <Input
                  id="login-email"
                  type="email"
                  className={`pl-10 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white placeholder:text-slate-400" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"} focus:border-cyan-400 focus:ring-cyan-400`}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className={`${t.text} font-medium`}>
                Senha
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${t.textMuted}`} />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className={`pl-10 pr-10 ${theme === "dark" ? "bg-slate-700 border-slate-500 text-white placeholder:text-slate-400" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"} focus:border-cyan-400 focus:ring-cyan-400`}
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${t.textMuted} hover:${t.textSecondary}`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              className={`w-full ${theme === "dark" ? "bg-slate-800 hover:bg-slate-900" : "bg-gray-800 hover:bg-gray-900"} text-white font-semibold py-3 rounded-lg transition-all duration-200`}
              onClick={() => setCurrentScreen("chat")}
            >
              ENTRAR
            </Button>

            <div className="text-center">
              <p className={`${t.textSecondary} text-sm`}>
                Novo usuário?{" "}
                <button
                  onClick={() => setCurrentScreen("register")}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium"
                >
                  Cadastre-se!
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderChat = () => (
    <div className={`h-screen ${t.bg} flex`}>
      {/* Sidebar */}
      <div className={`w-80 ${t.bgTertiary} ${t.border} border-r flex flex-col`}>
        {/* Header */}
        <div className={`p-4 ${t.border} border-b`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-slate-800" />
              </div>
              <h1 className={`text-xl font-bold ${t.text}`}>BoopChat</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen("settings")}
              className={`${t.textMuted} hover:${t.textSecondary}`}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg"
            onClick={() => setCurrentScreen("new-message")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Conversa
          </Button>
        </div>

        {/* User Profile */}
        <div className={`p-4 ${t.border} border-b`}>
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-slate-600 text-white">
                {userProfile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className={`${t.text} font-medium text-sm truncate`}>{userProfile.name}</p>
              <p className={`${t.textMuted} text-xs truncate`}>{userProfile.bio}</p>
            </div>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            <h2 className="text-cyan-400 font-medium mb-3">Conversas</h2>
          </div>

          <ScrollArea className="h-full px-2">
            <div className="space-y-1">
              {messages.length === 0 ? (
                <div className={`text-center p-8 ${t.textMuted}`}>
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma conversa ainda</p>
                  <p className="text-sm">Clique em "Nova Conversa" para começar</p>
                </div>
              ) : (
                <div
                  className={`${t.bgSecondary} hover:${t.bgTertiary} rounded-lg p-3 cursor-pointer transition-colors border-l-2 border-cyan-400`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-600 text-white text-sm">
                        {userProfile.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`${t.text} font-medium text-sm`}>Você</p>
                      <p className={`${t.textMuted} text-xs truncate`}>
                        {messages[messages.length - 1]?.content || "Última mensagem..."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <div className={`flex-1 flex items-center justify-center ${t.bgSecondary}`}>
            <div className="text-center">
              <MessageCircle className={`w-16 h-16 mx-auto mb-4 ${t.textMuted} opacity-50`} />
              <h3 className={`text-xl font-semibold ${t.text} mb-2`}>Bem-vindo ao BoopChat!</h3>
              <p className={`${t.textMuted} mb-6`}>Selecione uma conversa ou inicie uma nova para começar</p>
              <Button
                onClick={() => setCurrentScreen("new-message")}
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Conversa
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className={`${t.bgSecondary} p-4 ${t.border} border-b`}>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-slate-600 text-white">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className={`${t.text} font-medium`}>Você</h3>
                  <p className={`${t.textMuted} text-sm`}>Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-slate-600 text-white text-sm">
                        {message.user.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`${t.text} font-medium text-sm`}>{message.user}</span>
                        <span className={`${t.textMuted} text-xs`}>{message.timestamp}</span>
                      </div>
                      <div className="inline-block px-3 py-2 rounded-lg max-w-xs bg-cyan-500 text-slate-900">
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className={`${t.bgSecondary} p-4 ${t.border} border-t`}>
              <div className="flex items-center gap-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Insira sua mensagem..."
                  className={`flex-1 ${theme === "dark" ? "bg-slate-600 border-slate-500 text-white placeholder:text-slate-400" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"} focus:border-cyan-400 focus:ring-cyan-400`}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 p-3 rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  const screens = {
    landing: renderLanding,
    register: renderRegister,
    login: renderLogin,
    chat: renderChat,
    about: renderAbout,
    operation: renderOperation,
    settings: renderSettings,
    profile: renderProfile,
    "new-message": renderNewMessage,
  }

  return screens[currentScreen]()
}
