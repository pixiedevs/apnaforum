import Toast from "@/models/Toast"

const useToasts = () => useState<Toast[]>('mainToast', () => [])

export default useToasts
