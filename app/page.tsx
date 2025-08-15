"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  Shield,
  Users,
  FileText,
  BarChart3,
  Camera,
  Clock,
  AlertTriangle,
  Eye,
  Zap,
  BookOpen,
  Settings,
  Plus,
  Play,
  CheckCircle,
  Timer,
  Award,
} from "lucide-react"

interface Question {
  question: string
  type: string
  difficulty: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface Exam {
  id: string
  title: string
  subject: string
  duration: number
  questions: Question[]
  assignedStudents: string[]
  status: "draft" | "published" | "active" | "completed"
  createdAt: string
}

interface ExamSession {
  examId: string
  studentId: string
  startTime: string
  answers: Record<number, string>
  timeRemaining: number
  status: "in-progress" | "completed" | "submitted"
}

export default function AIExamDashboard() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [exams, setExams] = useState<Exam[]>([])
  const [currentExam, setCurrentExam] = useState<Exam | null>(null)
  const [examSession, setExamSession] = useState<ExamSession | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [completedExams, setCompletedExams] = useState<any[]>([])

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-8 w-8 text-primary neon-glow" />
              <h1 className="text-2xl font-playfair font-bold neon-text">AI Exam System</h1>
            </div>
            <CardTitle className="font-playfair">Select Your Role</CardTitle>
            <CardDescription>Choose your role to access the appropriate dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setSelectedRole("admin")}
              className="w-full justify-start neon-glow"
              variant="outline"
            >
              <Shield className="h-4 w-4 mr-2" />
              Admin Dashboard
            </Button>
            <Button
              onClick={() => setSelectedRole("faculty")}
              className="w-full justify-start neon-glow"
              variant="outline"
            >
              <Users className="h-4 w-4 mr-2" />
              Faculty Dashboard
            </Button>
            <Button
              onClick={() => setSelectedRole("invigilator")}
              className="w-full justify-start neon-glow"
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              Invigilator Dashboard
            </Button>
            <Button
              onClick={() => setSelectedRole("student")}
              className="w-full justify-start neon-glow"
              variant="outline"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Student Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const generateQuestions = async (formData: FormData) => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: formData.get("subject"),
          difficulty: formData.get("difficulty"),
          questionType: formData.get("questionType"),
          count: Number.parseInt(formData.get("count") as string),
        }),
      })

      if (!response.ok) throw new Error("Failed to generate questions")

      const data = await response.json()
      setQuestions(data.questions)
    } catch (error) {
      console.error("Question generation error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const createExam = (title: string, subject: string, duration: number, assignedStudents: string[]) => {
    const newExam: Exam = {
      id: Date.now().toString(),
      title,
      subject,
      duration,
      questions,
      assignedStudents,
      status: "published",
      createdAt: new Date().toISOString(),
    }
    setExams([...exams, newExam])
    setQuestions([]) // Clear questions after creating exam
  }

  const startExam = (exam: Exam) => {
    const session: ExamSession = {
      examId: exam.id,
      studentId: "current-student",
      startTime: new Date().toISOString(),
      answers: {},
      timeRemaining: exam.duration * 60, // Convert to seconds
      status: "in-progress",
    }
    setExamSession(session)
    setCurrentExam(exam)
    setCurrentQuestionIndex(0)
  }

  const submitAnswer = (questionIndex: number, answer: string) => {
    if (examSession) {
      setExamSession({
        ...examSession,
        answers: { ...examSession.answers, [questionIndex]: answer },
      })
    }
  }

  const completeExam = () => {
    if (examSession && currentExam) {
      const score = calculateScore()
      const completedExam = {
        id: currentExam.id,
        title: currentExam.title,
        subject: currentExam.subject,
        score,
        totalQuestions: currentExam.questions.length,
        completedAt: new Date().toISOString(),
      }
      setCompletedExams([...completedExams, completedExam])
      setExamSession(null)
      setCurrentExam(null)
    }
  }

  const calculateScore = () => {
    if (!examSession || !currentExam) return 0
    let correct = 0
    currentExam.questions.forEach((q, index) => {
      if (examSession.answers[index] === q.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / currentExam.questions.length) * 100)
  }

  const stats = {
    totalExams: 1247,
    activeExams: 23,
    studentsOnline: 892,
    violationsDetected: 7,
    completionRate: 94.2,
  }

  const recentExams = [
    { id: 1, title: "Advanced Mathematics Final", students: 156, status: "active", violations: 2 },
    { id: 2, title: "Computer Science Midterm", students: 89, status: "completed", violations: 0 },
    { id: 3, title: "Physics Lab Assessment", students: 67, status: "scheduled", violations: 0 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-primary neon-glow" />
                <h1 className="text-2xl font-playfair font-bold neon-text">AI Exam System</h1>
              </div>
              <Badge variant="secondary" className="neon-glow-pink">
                <Zap className="h-3 w-3 mr-1" />
                {selectedRole?.charAt(0).toUpperCase() + selectedRole?.slice(1)} Dashboard
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                System Active
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedRole(null)}>
                <Settings className="h-4 w-4 mr-2" />
                Switch Role
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Admin Dashboard */}
        {selectedRole === "admin" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="bg-card border-border hover:neon-glow transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalExams.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:neon-glow transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
                  <Clock className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary neon-text-pink">{stats.activeExams}</div>
                  <p className="text-xs text-muted-foreground">Currently running</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:neon-glow transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Students Online</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.studentsOnline}</div>
                  <p className="text-xs text-muted-foreground">Across all exams</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:neon-glow-pink transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Violations</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{stats.violationsDetected}</div>
                  <p className="text-xs text-muted-foreground">Detected today</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:neon-glow transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.completionRate}%</div>
                  <Progress value={stats.completionRate} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Exams */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-playfair">Recent Examinations</CardTitle>
                <CardDescription>Overview of recent and ongoing examinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-background border border-border hover:neon-glow transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            exam.status === "active"
                              ? "bg-secondary animate-pulse"
                              : exam.status === "completed"
                                ? "bg-primary"
                                : "bg-muted"
                          }`}
                        />
                        <div>
                          <h4 className="font-medium">{exam.title}</h4>
                          <p className="text-sm text-muted-foreground">{exam.students} students</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {exam.violations > 0 && (
                          <Badge variant="destructive" className="neon-glow-pink">
                            {exam.violations} violations
                          </Badge>
                        )}
                        <Badge
                          variant={
                            exam.status === "active"
                              ? "destructive"
                              : exam.status === "completed"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {exam.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Monitor
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Faculty Dashboard */}
        {selectedRole === "faculty" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-playfair flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Question Generation
                  </CardTitle>
                  <CardDescription>Generate intelligent questions using AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={generateQuestions} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input name="subject" placeholder="e.g., Mathematics" required />
                      </div>
                      <div>
                        <Label htmlFor="count">Question Count</Label>
                        <Select name="count" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select count" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Questions</SelectItem>
                            <SelectItem value="10">10 Questions</SelectItem>
                            <SelectItem value="15">15 Questions</SelectItem>
                            <SelectItem value="20">20 Questions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select name="difficulty" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="questionType">Question Type</Label>
                        <Select name="questionType" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="descriptive">Descriptive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full neon-glow" disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Generate Questions
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-playfair flex items-center gap-2">
                    <FileText className="h-5 w-5 text-secondary" />
                    Create Exam
                  </CardTitle>
                  <CardDescription>Create and assign exams to students</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      createExam(
                        formData.get("title") as string,
                        formData.get("subject") as string,
                        Number.parseInt(formData.get("duration") as string),
                        (formData.get("students") as string).split(",").map((s) => s.trim()),
                      )
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="title">Exam Title</Label>
                      <Input name="title" placeholder="e.g., Midterm Examination" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input name="subject" placeholder="e.g., Mathematics" required />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input name="duration" type="number" placeholder="60" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="students">Assign to Students (comma-separated)</Label>
                      <Textarea name="students" placeholder="student1@email.com, student2@email.com" />
                    </div>
                    <Button type="submit" className="w-full neon-glow" disabled={questions.length === 0}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Exam ({questions.length} questions)
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {questions.length > 0 && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-playfair">Generated Questions</CardTitle>
                  <CardDescription>Review and edit questions before creating exam</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {questions.map((q, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg bg-background">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium">Question {index + 1}</h4>
                          <Badge variant="outline">{q.difficulty}</Badge>
                        </div>
                        <p className="mb-3">{q.question}</p>
                        {q.options && q.options.length > 0 && (
                          <div className="space-y-2">
                            {q.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 rounded ${q.correctAnswer === String.fromCharCode(65 + optIndex) ? "bg-primary/20 border border-primary" : "bg-muted"}`}
                              >
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground mt-3">{q.explanation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-playfair">Created Exams</CardTitle>
                <CardDescription>Manage your created examinations</CardDescription>
              </CardHeader>
              <CardContent>
                {exams.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No exams created yet</p>
                ) : (
                  <div className="space-y-4">
                    {exams.map((exam) => (
                      <div key={exam.id} className="p-4 border border-border rounded-lg bg-background">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{exam.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {exam.subject} • {exam.questions.length} questions • {exam.duration} minutes
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{exam.status}</Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Student Dashboard */}
        {selectedRole === "student" && (
          <div className="space-y-6">
            {examSession && currentExam ? (
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-playfair">{currentExam.title}</CardTitle>
                      <CardDescription>{currentExam.subject}</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">
                        <Timer className="h-4 w-4 mr-2" />
                        {Math.floor(examSession.timeRemaining / 60)}:
                        {(examSession.timeRemaining % 60).toString().padStart(2, "0")}
                      </Badge>
                      <Badge variant="secondary">
                        Question {currentQuestionIndex + 1} of {currentExam.questions.length}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Progress value={((currentQuestionIndex + 1) / currentExam.questions.length) * 100} />

                    {currentExam.questions[currentQuestionIndex] && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">{currentExam.questions[currentQuestionIndex].question}</h3>

                        {currentExam.questions[currentQuestionIndex].options.length > 0 ? (
                          <div className="space-y-3">
                            {currentExam.questions[currentQuestionIndex].options.map((option, index) => (
                              <Button
                                key={index}
                                variant={
                                  examSession.answers[currentQuestionIndex] === String.fromCharCode(65 + index)
                                    ? "default"
                                    : "outline"
                                }
                                className="w-full justify-start text-left h-auto p-4"
                                onClick={() => submitAnswer(currentQuestionIndex, String.fromCharCode(65 + index))}
                              >
                                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                                {option}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <Textarea
                            placeholder="Enter your answer here..."
                            value={examSession.answers[currentQuestionIndex] || ""}
                            onChange={(e) => submitAnswer(currentQuestionIndex, e.target.value)}
                            className="min-h-32"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous
                      </Button>

                      {currentQuestionIndex === currentExam.questions.length - 1 ? (
                        <Button onClick={completeExam} className="neon-glow">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Exam
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            setCurrentQuestionIndex(
                              Math.min(currentExam.questions.length - 1, currentQuestionIndex + 1),
                            )
                          }
                          className="neon-glow"
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="font-playfair">Available Exams</CardTitle>
                    <CardDescription>Exams assigned to you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {exams.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No exams assigned yet</p>
                    ) : (
                      <div className="space-y-4">
                        {exams.map((exam) => (
                          <div key={exam.id} className="p-4 border border-border rounded-lg bg-background">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{exam.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {exam.subject} • {exam.questions.length} questions • {exam.duration} minutes
                                </p>
                              </div>
                              <Button onClick={() => startExam(exam)} className="neon-glow">
                                <Play className="h-4 w-4 mr-2" />
                                Start Exam
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="font-playfair flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Exam Results
                    </CardTitle>
                    <CardDescription>Your completed exam results and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {completedExams.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No completed exams yet</p>
                    ) : (
                      <div className="space-y-4">
                        {completedExams.map((exam) => (
                          <div key={exam.id} className="p-4 border border-border rounded-lg bg-background">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{exam.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {exam.subject} • Completed on {new Date(exam.completedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">{exam.score}%</div>
                                <p className="text-sm text-muted-foreground">
                                  {Math.round((exam.score / 100) * exam.totalQuestions)}/{exam.totalQuestions} correct
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Progress value={exam.score} className="h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Invigilator Dashboard */}
        {selectedRole === "invigilator" && (
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-playfair flex items-center gap-2">
                  <Camera className="h-5 w-5 text-secondary" />
                  Live Exam Monitoring
                </CardTitle>
                <CardDescription>Monitor students taking exams in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="p-4 border border-border rounded-lg bg-background">
                      <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Student {i + 1}</h4>
                          <p className="text-sm text-muted-foreground">Mathematics Exam</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-xs text-muted-foreground">Active</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-playfair flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-secondary" />
                  Violation Alerts
                </CardTitle>
                <CardDescription>Recent suspicious activities detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { student: "John Doe", violation: "Multiple faces detected", severity: "high", time: "2 min ago" },
                    {
                      student: "Jane Smith",
                      violation: "Tab switching detected",
                      severity: "medium",
                      time: "5 min ago",
                    },
                    { student: "Mike Johnson", violation: "Audio anomaly", severity: "low", time: "8 min ago" },
                  ].map((alert, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{alert.student}</h4>
                          <p className="text-sm text-muted-foreground">{alert.violation}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              alert.severity === "high"
                                ? "destructive"
                                : alert.severity === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={alert.severity === "high" ? "neon-glow-pink" : ""}
                          >
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
