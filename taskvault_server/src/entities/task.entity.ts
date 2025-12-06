import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "tasks", schema: "public" })
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: ["todo", "inprogress", "done"],
    default: "todo",
  })
  status: "todo" | "inprogress" | "done";

  @Column({
    type: "enum",
    enum: ["low", "medium", "high"],
    default: "medium",
  })
  priority: "low" | "medium" | "high";

  @Column({ type: "timestamp", nullable: true })
  dueDate?: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
